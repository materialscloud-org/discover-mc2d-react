import React from "react";

import "./index.css";

import StructureVisualizer from "mc-react-structure-visualizer";

import { Container, Row, Col } from "react-bootstrap";

import {
  ExploreButton,
  StructDownloadButton,
  formatChemicalFormula,
  formatSpaceGroupSymbol,
  getSymmetryInfo,
} from "mc-react-library";

import { MCInfoBox } from "../components/MCInfoBox";

import { AIIDA_REST_API_URL, EXPLORE_URL } from "../../common/restApiUtils";

import { formatAiidaProp, formatSourceLink } from "../utils";

function floatFormatter(val, prec = 1) {
  if (val >= 1e5 || (val < 0.01 && val !== 0)) {
    return val.toExponential(prec);
  }
  return val.toFixed(prec);
}

function formatPowerOf10(number, precision = 2) {
  const [base, exponent] = number.toExponential(precision).split("e");
  return (
    <span>
      {base} × 10<sup>{exponent}</sup>
    </span>
  );
}

function GeneralInfoBox({
  details,
  metadata,
  symmetryInfo,
  primaryParentInfo,
}) {
  let parentSymmInfo = getSymmetryInfo(primaryParentInfo.space_group_number);
  return (
    <MCInfoBox style={{ height: "460px" }}>
      <div>
        <b>General info</b>
        <ul className="no-bullets">
          <li>Formula: {formatChemicalFormula(details.general.formula)}</li>
          <li>
            Space group symbol:{" "}
            {formatSpaceGroupSymbol(symmetryInfo.space_group_symbol)}
          </li>
          <li>Space group number: {details.general.space_group_number}</li>
          <li>Prototype: {formatChemicalFormula(details.general.prototype)}</li>
          <li>Abundance: {formatPowerOf10(details.general.abundance)}</li>
        </ul>
      </div>
      {/* <div>
        <b>Primary 3D parent</b> (details in section "3D parent crystals")
        <ul className="no-bullets">
          <li>Formula: {formatChemicalFormula(primaryParentInfo.formula)}</li>
          <li>
            Source database:{" "}
            {formatSourceLink(
              primaryParentInfo.source_db,
              primaryParentInfo.source_db_id,
            )}
          </li>
          <li>
            Bravais lattice: {parentSymmInfo.bravais_lattice} (
            {parentSymmInfo.bravais_lattice_pearson})
          </li>
          <li>
            Space group:{" "}
            {formatSpaceGroupSymbol(parentSymmInfo.space_group_symbol)} (
            {primaryParentInfo.space_group_number})
          </li>
          <li>
            DF2-C09 Binding energy:{" "}
            {formatAiidaProp(primaryParentInfo.binding_energy_df2, "meV/Å²", 1)}
          </li>
          <li>
            rVV10 Binding energy:{" "}
            {formatAiidaProp(
              primaryParentInfo.binding_energy_rvv10,
              "meV/Å²",
              1,
            )}
          </li>
          <li>
            Δ<sub>DF2</sub>:{" "}
            {formatAiidaProp(primaryParentInfo.delta_df2, "%", 1, 100)}
          </li>
          <li>
            Δ<sub>rVV10</sub>:{" "}
            {formatAiidaProp(primaryParentInfo.delta_rvv10, "%", 1, 100)}
          </li>
        </ul>
      </div> */}
      <div>
        <b>Exfoliation info</b> (from primary parent{" "}
        {formatSourceLink(
          primaryParentInfo.source_db,
          primaryParentInfo.source_db_id,
        )}
        )
        <ul className="no-bullets">
          <li>
            <b>Binding energies:</b>
          </li>
          <ul className="no-bullets">
            <li>
              DF2-C09:{" "}
              {formatAiidaProp(
                primaryParentInfo.binding_energy_df2,
                "meV/Å²",
                1,
              )}
            </li>
            <li>
              rVV10:{" "}
              {formatAiidaProp(
                primaryParentInfo.binding_energy_rvv10,
                "meV/Å²",
                1,
              )}
            </li>
          </ul>
          <li>
            <b>Delta in interlayer distance (vdW vs revPBE):</b>
          </li>
          <ul className="no-bullets">
            <li>
              Δ<sub>DF2</sub>:{" "}
              {formatAiidaProp(primaryParentInfo.delta_df2, "%", 1, 100)}
            </li>
            <li>
              Δ<sub>rVV10</sub>:{" "}
              {formatAiidaProp(primaryParentInfo.delta_rvv10, "%", 1, 100)}
            </li>
          </ul>
        </ul>
      </div>
    </MCInfoBox>
  );
}

const StructureViewerBox = ({ uuid, structureInfo }) => {
  return (
    <>
      <div className="subsection-title">
        Structure <ExploreButton explore_url={EXPLORE_URL} uuid={uuid} />
      </div>
      <div className="structure-view-box subsection-shadow">
        <StructureVisualizer
          cifText={structureInfo.cif}
          initSupercell={[3, 3, 1]}
        />
        <div className="download-button-container">
          <StructDownloadButton
            aiida_rest_url={AIIDA_REST_API_URL}
            uuid={uuid}
          />
        </div>
      </div>
    </>
  );
};

function OverviewSection({ params, loadedData }) {
  return (
    <div>
      <div className="section-heading">General overview</div>
      <Container fluid className="section-container">
        <Row>
          <Col className="flex-column">
            <StructureViewerBox
              uuid={loadedData.details.general.structure_relaxed_uuid}
              structureInfo={loadedData.structureInfo}
            />
          </Col>
          <Col className="flex-column">
            <div style={{ marginTop: "35px" }}>
              <GeneralInfoBox
                details={loadedData.details}
                metadata={loadedData.metadata}
                symmetryInfo={loadedData.symmetryInfo}
                primaryParentInfo={loadedData.details.parents_3d[0]}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default OverviewSection;
