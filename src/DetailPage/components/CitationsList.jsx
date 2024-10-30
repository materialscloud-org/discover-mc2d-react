import { FaBook } from "react-icons/fa";

import "./CitationsList.css";

export const CitationText = ({ info }) => (
  <div style={{ padding: "2px" }}>
    <a
      className="citation-a"
      href={`https://doi.org/${info.doi}`}
      target="_blank"
    >
      <FaBook size={16} color="black" /> {info.authorsText}, {info.journalText},
      doi: {info.doi}, ({info.year})
    </a>
  </div>
);

const CITATION_MAPPING = {
  Mounet18: {
    authorsText: "Mounet et al.",
    journalText: "Nat. Nanotech.",
    doi: "10.1038/s41565-017-0035-5",
    year: 2018,
  },
  Campi23: {
    authorsText: "Campi et al.",
    journalText: "ACS Nano",
    doi: "10.1021/acsnano.2c11510",
    year: 2023,
  },
};

export const CitationsList = ({ citationLabels }) => (
  <div style={{ marginLeft: "8px" }}>
    {citationLabels.map((label) => (
      <CitationText key={label} info={CITATION_MAPPING[label]} />
    ))}
  </div>
);
