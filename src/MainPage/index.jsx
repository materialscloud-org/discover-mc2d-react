import React, { useEffect, useState } from "react";

import "./index.css";

import MaterialsCloudHeader from "mc-react-header";

import MaterialSelector from "mc-react-ptable-materials-grid";

import TitleAndLogo from "../common/TitleAndLogo";

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import { aboutText } from "./about";
import { restapiText } from "./restapiText";

import { loadIndexMc2d } from "./loadIndexMc2d";

function MainPage() {
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    loadIndexMc2d().then((loadedData) => {
      setColumns(loadedData.columns);
      setRows(loadedData.rows);
    });
  }, []);

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
      <div className="App">
        <div className="main-page">
          <TitleAndLogo />
          <div className="description">
            Results from screening most known 3D crystal structures finding
            those that can be computationally exfoliated producing 2D materials
            candidates.
          </div>
          <Tabs defaultActiveKey="use" className="mc3d-tabs">
            <Tab eventKey="use" title="Use">
              <div className="description">Search for materials:</div>
              <MaterialSelector columns={columns} rows={rows} />
            </Tab>
            <Tab eventKey="about" title="About">
              {aboutText}
            </Tab>
            <Tab eventKey="rest" title="REST API">
              {restapiText}
            </Tab>
          </Tabs>
        </div>
      </div>
    </MaterialsCloudHeader>
  );
}

export default MainPage;
