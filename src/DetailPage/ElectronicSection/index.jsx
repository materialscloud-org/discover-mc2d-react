import React, { useState, useEffect, useRef } from "react";

import { McloudSpinner } from "mc-react-library";

import { MCInfoBox } from "../components/MCInfoBox";

import { Container, Row, Col } from "react-bootstrap";

//import BandsVisualizer from "mc-react-bands";

import { ExploreButton } from "mc-react-library";

import { loadAiidaBands } from "../../common/restApiUtils";

import { AIIDA_REST_API_URL, EXPLORE_URL } from "../../common/restApiUtils";

import { getXYData } from "bands-visualiser";
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

function ElectronicInfoBox({ electronicData, metadata, cbm = 0, vbm = 0 }) {
  let magStateStr = electronicData.magnetic_state;
  if (magStateStr == null) {
    magStateStr = "non-magnetic calculation;  magnetic state untested";
  }

  console.log("CBM and VBM data:");
  console.log(cbm);
  console.log(vbm);

  return (
    <MCInfoBox style={{ height: "200px" }}>
      <div>
        <b>General info</b>
        <ul className="no-bullets">
          <li>Band gap: {formatAiidaProp(electronicData.band_gap, "eV")}</li>
          {cbm?.value != null && vbm?.value != null && (
            <>
              <li>
                CBM: {cbm.value.toFixed(3)} eV at k = {cbm.x.toFixed(3)}
              </li>
              <li>
                VBM: {vbm.value.toFixed(3)} eV at k = {vbm.x.toFixed(3)}
              </li>
            </>
          )}
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

//method to calculate the position of CBM and VBM
function calculateBMs(bandsData) {
  const allPoints = [];

  bandsData.paths.forEach((obj) => {
    const { x, values } = obj;
    values.forEach((band) => {
      band.forEach((val, idx) => {
        allPoints.push({ x: x[idx], value: val });
      });
    });
  });

  const positivePoints = allPoints.filter((p) => p.value > 0);
  const negativePoints = allPoints.filter((p) => p.value < 0);

  const cbmPoint = positivePoints.reduce(
    (minPoint, p) => (p.value < minPoint.value ? p : minPoint),
    positivePoints[0],
  );

  const vbmPoint = negativePoints.reduce(
    (maxPoint, p) => (p.value > maxPoint.value ? p : maxPoint),
    negativePoints[0],
  );

  return { cbm: cbmPoint, vbm: vbmPoint };
}

// Lazy loading BandComponent.
const BandComponent = ({
  bandsData,
  yRange = [-6.4, 6.4],
  customTraces,
  style,
}) => {
  const containerRef = useRef(null);

  console.log("custom traces", customTraces);

  useEffect(() => {
    if (!containerRef.current || !bandsData) return;
    import("bands-visualiser").then(({ BandsVisualiser }) => {
      const bandsDataArray = [
        {
          bandsData,
          traceFormat: {
            showlegend: false,
            line: { width: 2.0, color: "#636EFA" },
          },
        },
      ];

      BandsVisualiser(containerRef.current, {
        bandsDataArray,
        settings: { yaxis: { range: yRange } },
        customTraces: customTraces || [],
      });
    });
  }, [bandsData]);

  return <div ref={containerRef} style={style} />;
};

const ElectronicSection = ({ loadedData }) => {
  const electronicData = loadedData.details.electronic;
  const [bandsData, setBandsData] = useState(null);
  const [loadingBands, setLoadingBands] = useState(true);
  const [cbm, setCbm] = useState(null);
  const [vbm, setVbm] = useState(null);

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

      if (electronicData.band_gap.value > 0) {
        const { cbm: cbmPoint, vbm: vbmPoint } = calculateBMs(bands);
        setCbm(cbmPoint);
        setVbm(vbmPoint);
      }

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
                cbm={cbm}
                vbm={vbm}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ElectronicSection;
