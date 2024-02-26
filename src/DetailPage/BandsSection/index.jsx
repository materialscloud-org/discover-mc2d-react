import React, { useState, useEffect } from "react";

import BandsVisualizer from "mc-react-bands";

import { fetchAiidaAttributes } from "../../common/utils.jsx";
import { REST_API_AIIDA } from "../../common/config.js";

/**
 * Fetches AiiDA bands data in json format.
 *
 * @param {string} uuid The uuid of the AiiDA node
 * @returns the json response
 */
async function fetchAiidaBandsJson(uuid) {
  // append '&download=false' to have json file as a string
  const responseAiiDA = await fetch(
    `${REST_API_AIIDA}/nodes/${uuid}/download?download_format=json`,
  );
  const jsonAiiDA = await responseAiiDA.json();
  return jsonAiiDA;
}

function shiftBands(bandsData, shift) {
  bandsData.paths.forEach((path) => {
    path.values.forEach((subpath) => {
      subpath.forEach((val, idx, arr) => {
        arr[idx] += shift;
      });
    });
  });
}

function BandsSection(props) {
  const [bandsData, setBandsData] = useState(null);
  console.log(props);

  let bands_uuid = props.compoundInfo.bands_2D;
  let bands_y_max = props.compoundInfo.bands_2D_y_max_lim;
  let bands_y_min = props.compoundInfo.bands_2D_y_min_lim;
  let bands_y_origin = props.compoundInfo.bands_2D_y_origin;

  useEffect(() => {
    // Set state to null to show "loading" screen
    setBandsData(null);

    fetchAiidaBandsJson(bands_uuid).then((loadedData) => {
      shiftBands(loadedData, -bands_y_origin);
      setBandsData(loadedData);
    });
  }, []);

  let loading = bandsData == null;

  return (
    <div>
      <b>Bands</b>
      {loading ? (
        <span>loading</span>
      ) : (
        <BandsVisualizer
          bandsDataList={[bandsData]}
          showFermi={true}
          showLegend={undefined}
          yLimit={{ ymin: bands_y_min, ymax: bands_y_max }}
          dosRange={[-2.0, 2.0]}
          colorInfo={undefined}
        />
      )}
    </div>
  );
}

export default BandsSection;
