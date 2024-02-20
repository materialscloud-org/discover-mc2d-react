import React from "react";

import "./index.css";

import StructureVisualizer from "mc-react-structure-visualizer";

import {
  formatSpaceGroupSymbol,
  formatChemicalFormula,
  StructDownloadButton,
  ExploreButton,
} from "mc-react-library";

import { EXPLORE_URL } from "../../common/config";

function InfoBox(props) {
  let info = props.compoundInfo;

  function format_aiida_prop(key, unit, prec = 3, factor = 1) {
    if (!(key in info)) {
      return <span>N/A</span>;
    }
    let val = info[key]["value"] || 0.0;
    val *= factor;
    return (
      <span>
        {val.toFixed(prec)} {unit}{" "}
        <ExploreButton explore_url={EXPLORE_URL} uuid={info[key]["uuid"]} />
      </span>
    );
  }

  return (
    <div className="info-box">
      <div>
        <ul className="no-bullets">
          <li>Formula: {formatChemicalFormula(info["formula"])}</li>
          <li>Space group: {formatSpaceGroupSymbol(info["space_group"])}</li>
          <li>Point group: {formatSpaceGroupSymbol(info["point_group"])}</li>
          <li>Prototype: {formatChemicalFormula(info["prototype"])}</li>
          <li>Abundance: {info["abundance"]}</li>
          <li>Band gap: {format_aiida_prop("band_gap", "eV")}</li>
        </ul>
      </div>
      <div>
        <b>Magnetic properties</b>
        <ul className="no-bullets">
          <li>Magnetic state: {info["magnetic_state_long"]}</li>
          <li>
            Total magnetization:{" "}
            {format_aiida_prop("total_magnetization", "µB/cell", 2)}
          </li>
          <li>
            Absolute magnetization:{" "}
            {format_aiida_prop("absolute_magnetization", "µB/cell", 2)}
          </li>
        </ul>
      </div>
      <div>
        <b>Binding energies</b>
        <ul className="no-bullets">
          <li>
            DF2-C09:{" "}
            {format_aiida_prop(
              "binding_energy_per_substructure_per_unit_area_df2",
              "meV/Å²",
              1,
              1000,
            )}
          </li>
          <li>
            rVV10:{" "}
            {format_aiida_prop(
              "binding_energy_per_substructure_per_unit_area_rvv10",
              "meV/Å²",
              1,
              1000,
            )}
          </li>
        </ul>
      </div>
      <div>
        <b>Delta in interlayer distance (vdW vs revPBE)</b>
        <ul className="no-bullets">
          <li>
            Δ<sub>DF2</sub>: {format_aiida_prop("delta_df2", "%", 1, 100)}
          </li>
          <li>
            Δ<sub>rVV10</sub>: {format_aiida_prop("delta_rvv10", "%", 1, 100)}
          </li>
        </ul>
      </div>
    </div>
  );
}

function OverviewSection(props) {
  return (
    <div>
      <div className="overview-section">
        <div className="structure-view-section">
          <div className="subsection-title-container">
            <b>Structure</b>{" "}
            <ExploreButton
              explore_url="https://www.materialscloud.org/explore/mc2d"
              uuid={props.compoundInfo.structure_2D}
            />
          </div>
          <StructureVisualizer cifText={props.cifText} />
          <div className="download-button-container">
            <StructDownloadButton
              aiida_rest_url="https://aiida.materialscloud.org/mc2d/api/v4"
              uuid={props.compoundInfo.structure_2D}
            />
          </div>
        </div>
        <div>
          <div className="subsection-title-container">
            <b>Info and properties</b>
          </div>
          <div className="general-info-section">
            <InfoBox compoundInfo={props.compoundInfo} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default OverviewSection;
