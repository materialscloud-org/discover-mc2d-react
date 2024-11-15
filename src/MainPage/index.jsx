import React, { useEffect, useState, useRef } from "react";

import "./index.css";

import MaterialsCloudHeader from "mc-react-header";

import MaterialSelector from "mc-react-ptable-materials-grid";

import TitleAndLogo from "../common/TitleAndLogo";

import { Container, Tab, Tabs, Form } from "react-bootstrap";

import { aboutText } from "./about";
import { restapiText } from "./restapiText";

import { loadIndexMc2d } from "./loadIndexMc2d";

import { DownloadButton } from "./DownloadButton.jsx";

function MainPage() {
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    loadIndexMc2d().then((loadedData) => {
      setColumns(loadedData.columns);
      setRows(loadedData.rows);
    });
  }, []);

  const materialSelectorRef = useRef(null);

  return (
    <MaterialsCloudHeader
      activeSection={"discover"}
      breadcrumbsPath={[
        { name: "Discover", link: "https://www.materialscloud.org/discover" },
        {
          name: "Materials Cloud 2D crystals database",
          link: null,
        },
      ]}
    >
      <Container fluid="xxl">
        <TitleAndLogo />
        <div className="description">
          Materials Cloud 2D crystals database is a curated set of 2D materials
          obtained by screening most known 3D crystal structures by a
          computational exfoliation procedure. This database contains the
          relaxed 2D materials and their various properties.
        </div>
        <Tabs defaultActiveKey="use" className="main-tabs">
          <Tab eventKey="use" title="Use">
            {/* <div className="description">
                Search for materials by filtering based on the periodic table
                and the columns of the table below:
              </div> */}
            <div style={{ marginTop: "20px" }}></div>
            <MaterialSelector
              ref={materialSelectorRef}
              columns={columns}
              rows={rows}
            />
            <DownloadButton
              materialSelectorRef={materialSelectorRef}
              disabled={rows.length == 0}
            />
          </Tab>
          <Tab eventKey="about" title="About">
            {aboutText}
          </Tab>
          <Tab eventKey="rest" title="REST API">
            {restapiText}
          </Tab>
        </Tabs>
      </Container>
    </MaterialsCloudHeader>
  );
}

export default MainPage;
