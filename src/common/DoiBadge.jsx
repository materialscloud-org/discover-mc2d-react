import React from "react";

import "./DoiBadge.css";

export default function DoiBadge(props) {
  return (
    <div className="archive-doicitation">
      <span className="doi-badge">
        <span className="doi-left">DOI</span>
        <a
          href={`https://doi.org/10.24435/materialscloud:${props.doi_id}`}
          className="doi-right"
          target="_blank"
        >
          {`10.24435/materialscloud:${props.doi_id}`}
        </a>
      </span>
    </div>
  );
}
