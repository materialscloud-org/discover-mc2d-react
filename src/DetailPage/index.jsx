import React, { useState, useEffect } from "react";

import TitleAndLogo from "../common/TitleAndLogo";

import { useParams, useNavigate } from "react-router-dom";

import MaterialsCloudHeader from "mc-react-header";

import {
  formatTitle,
  fetchAiidaAttributes,
  fetchAiidaCifText,
} from "../common/utils.jsx";

import { REST_API_COMPOUNDS } from "../common/config";

import "./index.css";
import { McloudSpinner } from "mc-react-library";

import OverviewSection from "./OverviewSection";
import SelectionSection from "./SelectionSection";

async function fetchCompoundData(compound, id) {
  // 1. fetch the compound data from MC Rest API:
  const responseCompound = await fetch(`${REST_API_COMPOUNDS}/${compound}`);
  const jsonCompound = await responseCompound.json();
  // this returns a list of compounds with the given formula
  // We need to find the correct one with the specified id
  const compoundsArr = jsonCompound.data[`${compound}`];
  const spacegroupsArr = compoundsArr.map((stru) => stru.space_group);
  const idsArr = compoundsArr.map((stru) => `mc2d-${stru.mc2d_id}`);

  const selectedCompoundInfo = compoundsArr[idsArr.indexOf(id)];

  // Fetch structuredata here once, as that might be used for multiple subsections
  // Other AiiDA data (e.g. bands) will be fetched within each subsection
  const structure_uuid = selectedCompoundInfo.structure_2D;

  let loadedData = {
    compoundInfo: selectedCompoundInfo,
    sameFormulaStructures: { spacegrps: spacegroupsArr, ids: idsArr },
    structureAttributes: await fetchAiidaAttributes(structure_uuid),
    structureCifText: await fetchAiidaCifText(structure_uuid),
  };
  return loadedData;
}

function DetailPage() {
  const [compoundInfo, setCompoundInfo] = useState(null);
  const [sameFormulaStructures, setSameFormulaStructures] = useState(null);
  const [structureAttributes, setStructureAttributes] = useState(null);
  const [structureCifText, setStructureCifText] = useState(null);

  // for routing
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    // Set state to null to show "loading" screen
    // while new parameters are loaded
    setCompoundInfo(null);
    setSameFormulaStructures(null);
    setStructureAttributes(null);
    setStructureCifText(null);

    let compound = params["compound"];
    let id = params["id"];

    fetchCompoundData(compound, id).then((loadedData) => {
      setCompoundInfo(loadedData.compoundInfo);
      setSameFormulaStructures(loadedData.sameFormulaStructures);
      setStructureAttributes(loadedData.structureAttributes);
      setStructureCifText(loadedData.structureCifText);
    });
  }, [params.compound, params.id]); // <- call when route params change

  let loading = compoundInfo == null;
  return (
    <MaterialsCloudHeader
      activeSection={"discover"}
      breadcrumbsPath={[
        { name: "Discover", link: "https://www.materialscloud.org/discover" },
        {
          name: "Materials Cloud 2D crystals database",
          link: `${import.meta.env.BASE_URL}`,
        },
        { name: formatTitle(params), link: null },
      ]}
    >
      <div className="detail-page">
        <TitleAndLogo />
        <div className="detail-page-inner">
          <h3>{formatTitle(params)}</h3>
          {loading ? (
            <div style={{ padding: "80px 400px" }}>
              <McloudSpinner />
            </div>
          ) : (
            <>
              <SelectionSection
                sameFormulaStructures={sameFormulaStructures}
                currentStructure={params}
              />
              <OverviewSection
                cifText={structureCifText}
                compoundInfo={compoundInfo}
              />
            </>
          )}
        </div>
      </div>
    </MaterialsCloudHeader>
  );
}

export default DetailPage;
