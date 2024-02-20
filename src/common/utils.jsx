import { REST_API_AIIDA } from "./config";

import { formatChemicalFormula } from "mc-react-library";

export function formatTitle(params) {
  return (
    <span>
      {formatChemicalFormula(params["compound"])} ({params["id"]})
    </span>
  );
}

/**
 * Fetches all AiiDA attributes for the node.
 *
 * @param {string} uuid The uuid of the AiiDA node
 * @returns The AiiDA attributes available through the restAPI
 */
export async function fetchAiidaAttributes(uuid) {
  const responseAiiDA = await fetch(
    `${REST_API_AIIDA}/nodes/${uuid}/contents/attributes`,
  );
  const jsonAiiDA = await responseAiiDA.json();
  return jsonAiiDA.data.attributes;
}

/**
 * For an AiiDA StructureData node, fetches the structure in CIF format
 *
 * @param {string} uuid The uuid of the AiiDA node
 * @returns The structure in CIF format as a continuous string
 */
export async function fetchAiidaCifText(uuid) {
  const responseAiiDACif = await fetch(
    `${REST_API_AIIDA}/nodes/${uuid}/download?download_format=cif&download=false`,
  );
  const jsonAiiDACif = await responseAiiDACif.json();
  return jsonAiiDACif.data.download.data;
}
