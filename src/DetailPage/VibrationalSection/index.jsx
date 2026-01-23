import React, { useState, useEffect, useRef, Suspense, lazy } from "react";
import { McloudSpinner, ExploreButton } from "mc-react-library";
import { Container, Row, Col } from "react-bootstrap";

import { loadAiidaBands, loadPhononVis } from "../../common/restApiUtils";
import { EXPLORE_URL } from "../../common/restApiUtils";

//import PhononVisualizer from "mc-react-phonon-visualizer";

// Lazy load of PhononVis seems to improve performance on bad networks.
// It might be worth implmenting this on the component level?
const LazyPhononVisualizer = lazy(() => import("mc-react-phonon-visualizer"));

// Component that wraps the BandsVisualiser into a React component
const BandComponent = ({ bandsData, style }) => {
  const containerRef = useRef(null);

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
        settings: { yaxis: { title: { text: "Phonon bands [Thz]" } } },
      });
    });
  }, [bandsData]);

  return <div ref={containerRef} style={style} />;
};

const VibrationalSection = ({ loadedData, params }) => {
  const [bandsData, setBandsData] = useState(null);
  const [loadingBands, setLoadingBands] = useState(true);
  const [phononVisData, setPhononVisData] = useState(null);

  const vibrationalData = loadedData.details.vibrational;
  const bandsUuid = vibrationalData.phonon_bands_uuid;

  useEffect(() => {
    setBandsData(null);
    if (bandsUuid) {
      loadAiidaBands(bandsUuid).then((bands) => {
        setBandsData(bands);
        setLoadingBands(false);
      });
    } else {
      setLoadingBands(false);
    }

    loadPhononVis(params.id).then((data) => {
      setPhononVisData(data);
      console.log("Phonon visualizer data", data);
    });
  }, [bandsUuid, params.id]);

  const bandsAvailable = bandsData != null;

  return (
    <div>
      <div className="section-heading">Vibrational properties</div>

      <Container fluid className="section-container">
        {loadingBands ? (
          <div style={{ width: "150px", padding: "40px", margin: "0 auto" }}>
            <McloudSpinner />
          </div>
        ) : !bandsAvailable ? (
          <span>Vibrational properties not available for this structure.</span>
        ) : (
          <Row>
            <Col className="flex-column">
              <div className="subsection-title">
                Phonon band structure{" "}
                <ExploreButton explore_url={EXPLORE_URL} uuid={bandsUuid} />
              </div>
              <BandComponent
                bandsData={bandsData}
                style={{ height: "500px" }}
              />
            </Col>
            <Col className="flex-column"></Col>
          </Row>
        )}
      </Container>

      {phononVisData && (
        <div>
          <div style={{ margin: "30px 0px 5px 12px" }}>
            <div className="subsection-title">
              Interactive phonon visualizer{" "}
              <ExploreButton explore_url={EXPLORE_URL} uuid={bandsUuid} />
            </div>
          </div>
          <div style={{ height: "500px" }}>
            <Suspense fallback={<McloudSpinner />}>
              <LazyPhononVisualizer
                props={{ title: "Phonon visualizer", ...phononVisData }}
              />
            </Suspense>
          </div>
        </div>
      )}
    </div>
  );
};

export default VibrationalSection;
