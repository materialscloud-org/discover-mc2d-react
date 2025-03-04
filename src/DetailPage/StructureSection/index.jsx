import React from "react";

import { ExploreButton, StructDownloadButton } from "mc-react-library";

import { Container, Row, Col } from "react-bootstrap";

import { MCInfoBox } from "../components/MCInfoBox";
import { MCTable } from "../components/MCTable";

import { AIIDA_REST_API_URL, EXPLORE_URL } from "../../common/restApiUtils";

const StructureSection = ({ params, loadedData }) => {
  let details = loadedData.details;
  let structureInfo = loadedData.structureInfo;

  return (
    <div>
      <div className="section-heading">Structural details</div>
      <Container fluid className="section-container">
        <Row>
          <Col className="flex-column">
            <div style={{ marginBottom: "10px" }}>
              <div className="subsection-title">General</div>
              <MCInfoBox title="General">
                <ul className="no-bullets">
                  <li>
                    Explore provenance{" "}
                    <ExploreButton
                      explore_url={EXPLORE_URL}
                      uuid={details.general.structure_relaxed_uuid}
                    />
                  </li>
                  <li>
                    Download structure
                    <StructDownloadButton
                      aiida_rest_url={AIIDA_REST_API_URL}
                      uuid={details.general.structure_relaxed_uuid}
                    />
                  </li>
                </ul>
              </MCInfoBox>
            </div>
            <div>
              <div className="subsection-title">Cell</div>
              <MCTable
                headerRow={["", "x [Å]", "y [Å]", "z [Å]"]}
                contents={structureInfo.aiidaAttributes.cell.map((v, i) => [
                  <span>
                    v<sub>{i + 1}</sub>
                  </span>,
                  v[0],
                  v[1],
                  v[2],
                ])}
              />
            </div>
          </Col>
          <Col className="flex-column">
            <div>
              <div className="subsection-title">Atomic positions</div>
              <MCTable
                headerRow={["Kind label", "x [Å]", "y [Å]", "z [Å]"]}
                contents={structureInfo.aiidaAttributes.sites.map((s) => [
                  s.kind_name,
                  s.position[0],
                  s.position[1],
                  s.position[2],
                ])}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default StructureSection;
