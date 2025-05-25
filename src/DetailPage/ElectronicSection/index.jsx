import React, { useState, useEffect, useRef } from "react";

import { McloudSpinner } from "mc-react-library";

import { MCInfoBox } from "../components/MCInfoBox";

import { Container, Row, Col } from "react-bootstrap";

//import BandsVisualizer from "mc-react-bands";
import { BandsVisualiser } from "bands-visualiser";

import { ExploreButton } from "mc-react-library";

import { loadAiidaBands } from "../../common/restApiUtils";

import { AIIDA_REST_API_URL, EXPLORE_URL } from "../../common/restApiUtils";

import * as math from "mathjs";

import { formatAiidaProp } from "../utils";

function shiftBands(bandsData, shift) {
  bandsData.paths.forEach((path) => {
    path.values.forEach((subpath) => {
      subpath.forEach((val, idx, arr) => {
        arr[idx] += shift;
      });
    });
  });
}

function ElectronicInfoBox({ electronicData, metadata }) {
  let magStateStr = electronicData.magnetic_state;
  if (magStateStr == null) {
    magStateStr = "non-magnetic calculation;  magnetic state untested";
  }

  return (
    <MCInfoBox style={{ height: "200px" }}>
      <div>
        <b>General info</b>
        <ul className="no-bullets">
          <li>Band gap: {formatAiidaProp(electronicData.band_gap, "eV")}</li>
          <li>Magnetic state: {magStateStr}</li>
          <li>
            Total magnetization:{" "}
            {formatAiidaProp(electronicData.total_magnetization, "µB/cell", 2)}
          </li>
          <li>
            Absolute magnetization:{" "}
            {formatAiidaProp(
              electronicData.absolute_magnetization,
              "µB/cell",
              2,
            )}
          </li>
        </ul>
      </div>
    </MCInfoBox>
  );
}

const BandComponent = ({ bandsData, style, yRange = [-6.4, +6.4] }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !bandsData) return;

    const bandsDataArray = [
      {
        bandsData: bandsData,
        traceFormat: {
          // we adjust width and color
          showlegend: false,
          line: { width: 2.0, color: "#636EFA" },
        },
      },
    ];

    BandsVisualiser(containerRef.current, {
      bandsDataArray,
      settings: { yaxis: { range: yRange } },
    });
  }, [bandsData]);

  return <div ref={containerRef} style={style} />;
};

const ElectronicSection = ({ loadedData }) => {
  const electronicData = loadedData.details.electronic;
  const [bandsData, setBandsData] = useState(null);
  const [loadingBands, setLoadingBands] = useState(true);

  const bandsAvailable =
    electronicData.bands_uuid != null &&
    electronicData.fermi_energy?.value != null &&
    electronicData.band_gap?.value != null;

  // Compute band shift
  const bandShift = bandsAvailable
    ? -Math.max(electronicData.fermi_energy.value) -
      electronicData.band_gap.value / 2
    : 0;

  // Load band data if available
  useEffect(() => {
    if (!bandsAvailable) {
      setLoadingBands(false);
      return;
    }

    setBandsData(null);
    setLoadingBands(true);

    loadAiidaBands(electronicData.bands_uuid).then((bands) => {
      shiftBands(bands, bandShift); //shift before passing
      setBandsData(bands);
      setLoadingBands(false);
    });
  }, [electronicData.bands_uuid, bandsAvailable, bandShift]);

  return (
    <div>
      <div className="section-heading">Electronic properties</div>
      <Container fluid className="section-container">
        <Row>
          <Col className="flex-column">
            {loadingBands ? (
              <div
                style={{ width: "150px", padding: "40px", margin: "0 auto" }}
              >
                <McloudSpinner />
              </div>
            ) : !bandsAvailable ? (
              <span>Electronic bands are not available for this material.</span>
            ) : (
              <>
                <div className="subsection-title">
                  Electronic band structure{" "}
                  <ExploreButton
                    explore_url={EXPLORE_URL}
                    uuid={electronicData.bands_uuid}
                  />
                </div>
                <BandComponent
                  bandsData={bandsData}
                  style={{ height: "500px" }}
                />
              </>
            )}
          </Col>
          <Col className="flex-column">
            <div style={{ marginTop: "35px" }}>
              <ElectronicInfoBox
                electronicData={electronicData}
                metadata={loadedData.metadata}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ElectronicSection;
