import React, { useState } from "react";
import { Spinner } from "react-bootstrap";

import { saveAs } from "file-saver";

import { HelpButton } from "mc-react-library";
import { Popover, Button } from "react-bootstrap";

import { loadStructureUuids, AIIDA_REST_API_URL } from "../common/restApiUtils";

import "./DownloadButton.css";

const getCurrentDateString = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day}-${hours}-${minutes}-${seconds}`;
};

const popover = (
  <Popover id="popover-basic">
    <Popover.Header>
      <b>Download filtered entries</b>
    </Popover.Header>
    <Popover.Body style={{ textAlign: "justify" }}>
      <p>
        This button allows to download all currently filtered entries shown in
        the Materials Grid. The data is downloaded in JSON format, as an array.
        The array contains a JSON object for each material entry, with key-value
        pairs corresponding to the column properties. Additionally, each entry
        includes a link to the corresponding detail page and a link to download
        the file in CIF format. <br />
        <br />
        Note, to download all of the CIF files directly, see the corresponding
        Materials Cloud Archive entry.
      </p>
    </Popover.Body>
  </Popover>
);

export const DownloadButton = ({ materialSelectorRef, disabled }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async () => {
    if (materialSelectorRef.current) {
      setIsLoading(true);
      try {
        const structureUuids = await loadStructureUuids();
        const data = materialSelectorRef.current.getFilteredRows();

        let modData = data.map((entry) => {
          let uuid = structureUuids[entry.id];
          let downloadLink = `${AIIDA_REST_API_URL}/nodes/${uuid}/download?download_format=cif`;
          let modEntry = {
            ...entry,
            details_link: `${window.location.origin}${entry.href}`,
            download_cif: downloadLink,
          };
          delete modEntry.href;
          return modEntry;
        });

        const json = JSON.stringify(modData, null, 2);
        const blob = new Blob([json], { type: "application/json" });
        const filename = `mc2d_filtered_entries_${getCurrentDateString()}.json`;
        saveAs(blob, filename);
      } catch (error) {
        console.error("Error downloading data:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="download-button-outer-container">
      <Button
        size="sm"
        variant="secondary"
        onClick={handleDownload}
        disabled={disabled || isLoading}
        // className={`aggrid-style-button ${disabled || isLoading ? "aggrid-style-button-disabled" : ""}`}
        // style={{ marginTop: "5px" }}
      >
        {isLoading ? (
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
        ) : (
          "Download filtered entries"
        )}
      </Button>
      <HelpButton popover={popover} />
    </div>
  );
};
