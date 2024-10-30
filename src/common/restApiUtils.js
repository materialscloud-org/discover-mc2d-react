// ------------------------------------------------------------------------------------------------
// REST API UTILITIES
// Define all functions for api calls here.

export const MC_REST_API_URL =
  "https://dev-aiida.materialscloud.org/mc-rest-api/mc2d/pbe-v1";
export const AIIDA_REST_API_URL =
  "https://dev-aiida.materialscloud.org/mc2d-new/api/v4";
export const EXPLORE_URL = "https://dev-www.materialscloud.org/explore/mc2d";

// delay function for testing loading animations:
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function loadIndex() {
  // await delay(2000);
  let endpoint = `${MC_REST_API_URL}/entries`;
  try {
    const response = await fetch(endpoint, { method: "get" });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error("Error fetching index:", error);
  }
}

export async function loadMetadata() {
  let endpoint = `${MC_REST_API_URL}/meta`;
  try {
    const response = await fetch(endpoint, { method: "get" });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error("Error fetching metadata:", error);
  }
}

export async function loadDetails(id) {
  let endpoint = `${MC_REST_API_URL}/entries/${id}`;
  try {
    const response = await fetch(endpoint, { method: "get" });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error("Error fetching details:", error);
  }
}

export async function loadAiidaAttributes(uuid) {
  let endpoint = `${AIIDA_REST_API_URL}/nodes/${uuid}/contents/attributes`;
  try {
    const response = await fetch(endpoint, { method: "get" });
    const json = await response.json();
    return json.data.attributes;
  } catch (error) {
    console.error("Error fetching AiiDA attributes:", error);
  }
}

export async function loadAiidaCif(uuid) {
  let endpoint = `${AIIDA_REST_API_URL}/nodes/${uuid}/download?download_format=cif&download=false`;
  try {
    const response = await fetch(endpoint, { method: "get" });
    const json = await response.json();
    return json.data.download.data;
  } catch (error) {
    console.error("Error fetching AiiDA cif:", error);
  }
}

export async function loadAiidaBands(uuid) {
  await delay(2000);
  let endpoint = `${AIIDA_REST_API_URL}/nodes/${uuid}/download?download_format=json`;
  try {
    const response = await fetch(endpoint, { method: "get" });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error("Error fetching AiiDA bands:", error);
  }
}

export async function loadPhononVis(id) {
  let endpoint = `${MC_REST_API_URL}/phonon-vis/${id}`;
  try {
    const response = await fetch(endpoint, { method: "get" });
    if (!response.ok) {
      return null;
    }
    const json = await response.json();
    return json;
  } catch (error) {
    console.error("Error fetching phonon-vis:", error);
    return null;
  }
}
