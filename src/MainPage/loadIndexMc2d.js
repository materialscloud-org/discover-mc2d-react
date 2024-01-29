import { REST_API_COMPOUNDS } from "../common/config";

/* The MaterialsSelector needs two inputs:
 1) column definitions
 2) async function that loads data

 The data needs to be an array of row objects, whereas each row needs contain
 * entries for all the columns, with the key matching the 'field' string of the column.
 * 'elem_array', which is used in the periodic table filtering.
 */

/* Define the columns
 some columns are special: id, formula (see the implementation)
 * colType: "text", "integer", "float" - defines formatting & filters
 * hide: true if the column is hidden initially
 any additional input is passed to ag-grid column definitions (e.g. width) 
 */
function columns(info) {
  return [
    {
      field: "id",
      headerName: "ID",
      colType: "id",
      infoText: "The unique MC2D identifier of each structure.",
      width: 100,
    },
    {
      field: "formula",
      headerName: "Formula",
      colType: "formula",
      infoText: "The full formula in Hill notation.",
    },
    {
      field: "prototype",
      headerName: "Prototype",
      colType: "text",
      infoText: "Prototype structure.",
      width: 140,
    },
    {
      field: "point_group",
      headerName: "Point group",
      colType: "text",
      infoText: "The point group symmetry of the material.",
      width: 100,
    },
    {
      field: "band_gap",
      headerName: "Band gap",
      colType: "float",
      infoText: "Band gap of the 2D material.",
      unit: "eV",
      width: 110,
    },
    {
      field: "abundance",
      headerName: "Abundance",
      colType: "float",
      infoText:
        "Abundance on the Earth of the rarest of the elements present in the compound.",
      width: 120,
    },
    {
      field: "mag_state",
      headerName: "Magnetic state",
      colType: "text",
      infoText: "Magnetic state",
      width: 110,
    },
    {
      field: "df2_c09",
      headerName: "E(bind) DF2-C09",
      colType: "float",
      infoText:
        "Binding energy of the bulk 3D, per 2D layer and per unit area, obtained with the vdw-DF2-C09 functional.",
      unit: "meV/Å²",
      width: 115,
    },
    {
      field: "rvv10",
      headerName: "E(bind) rVV10",
      colType: "float",
      infoText:
        "Binding energy of the bulk 3D, per 2D layer and per unit area, obtained with the vdw-rVV10 functional.",
      unit: "meV/Å²",
      width: 115,
    },
    {
      field: "parent_formula",
      headerName: "3D parent formula",
      colType: "formula",
      infoText:
        "Chemical formula for the 3D parent (lowest energy parent, if multiple exist).",
      hide: true,
    },
    {
      field: "parent_spg",
      headerName: "3D parent space group",
      colType: "spg_symbol",
      infoText:
        "Space group for the 3D parent (lowest energy parent, if multiple exist).",
      hide: true,
      width: 120,
    },
    {
      field: "parent_source_db",
      headerName: "3D parent source DB",
      colType: "text",
      infoText:
        "Source database for the 3D parent (lowest energy parent, if multiple exist).",
      hide: true,
      width: 120,
    },
    {
      field: "parent_source_id",
      headerName: "3D parent source ID",
      colType: "text",
      infoText:
        "Source database ID for the 3D parent (lowest energy parent, if multiple exist).",
      hide: true,
      width: 120,
    },
  ];
}

function calcElementArray(formula) {
  var formula_no_numbers = formula.replace(/[0-9]/g, "");
  var elements = formula_no_numbers.split(/(?=[A-Z])/);
  return elements;
}

function countNumberOfAtoms(formula) {
  // split on capital letters to get element+number strings
  var elnum = formula.split(/(?=[A-Z])/);
  var num = 0;
  elnum.forEach((v) => {
    let match = v.match(/\d+/);
    let n = match == null ? 1 : parseInt(match[0]);
    num += n;
  });
  return num;
}

function formatRows(entries) {
  let rows = [];

  // for testing a small subset:
  // entries = {
  //   1: entries["1"],
  //   2: entries["2"],
  // };

  Object.keys(entries).forEach((i) => {
    let comp = entries[i];
    let elemArr = calcElementArray(comp["formula"]);

    let row = {
      id: `mc2d-${i}`,
      formula: comp["formula"],
      prototype: comp["prototype"],
      point_group: comp["point_group"],
      band_gap: comp["band_gap"],
      abundance: comp["abundance"],
      mag_state: comp["mag_state"],
      df2_c09: comp["df2_c09"] !== null ? comp["df2_c09"] * 1000 : null, // convert to meV/Å^2
      rvv10: comp["rvv10"] !== null ? comp["rvv10"] * 1000 : null, // convert to meV/Å^2
      parent_formula: comp["parent"]["formula"],
      parent_spg: comp["parent"]["spg"],
      parent_source_db: comp["parent"]["source_db"],
      parent_source_id: comp["parent"]["source_id"],
      n_elem: elemArr.length,
      elem_array: elemArr,
      n_atoms: countNumberOfAtoms(comp["formula"]),
      href: `test`,
    };
    rows.push(row);
  });
  return rows;
}

export async function loadIndexMc2d() {
  const index_response = await fetch(REST_API_COMPOUNDS, { method: "get" });
  const index_json = await index_response.json();
  const index_compounds = index_json["data"]["compounds"];
  const index_observables = index_json["data"]["observables"];

  // return a Promise of the correctly formatted data
  return {
    columns: columns(index_observables),
    rows: formatRows(index_compounds),
  };
}
