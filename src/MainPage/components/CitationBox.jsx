import React from "react";

import "./CitationBox.css";

export default function CitationBox(props) {
  return (
    <div className="citationbox-container">
      <b>{props.title}</b>
      <br />
      {props.authors}, {props.journal}, doi:{" "}
      <a href={`https://doi.org/${props.doi}`} target="_blank">
        {props.doi}
      </a>{" "}
      ({props.year})<br />
      {props.data ? (
        <div className="citationbox-extras">
          <b>Accompanying data: </b>
          {props.data}
        </div>
      ) : null}
      {props.arxiv ? (
        <div className="citationbox-extras">
          <b>arxiv: </b>
          {props.arxiv}
        </div>
      ) : null}
    </div>
  );
}

{
  /* <div style="border: 2px solid #D6D6D6; border-radius: 20px; padding: 10px; margin: 5px">
<b> Two-dimensional materials from high-throughput computational exfoliation of experimentally known compounds</b><br>
N. Mounet, M. Gibertini, P. Schwaller, D. Campi, A. Merkys, A. Marrazzo, T. Sohier, I. E. Castelli, A. Cepellotti, G. Pizzi & N. Marzari,
Nat. Nanotech. 13, 246-252, doi: <a href="https://doi.org/10.1038/s41565-017-0035-5" target="_blank">10.1038/s41565-017-0035-5</a> (2018)
<div style="margin-left: 30px; margin-top: 6px">
    <b>Accompanying data:</b> N. Mounet et al., Materials Cloud Archive 2020.158,
    doi: <a href="https://doi.org/10.24435/materialscloud:az-b2" target="_blank">10.24435/materialscloud:az-b2</a> (2020)
</div>
</div>


<div style="border: 2px solid #D6D6D6; border-radius: 20px; padding: 10px; margin: 5px">
<b> Expansion of the Materials Cloud 2D Database</b><br>
D. Campi, N. Mounet, M. Gibertini, G. Pizzi & N. Marzari,
ACS Nano 17, 12, 11268-11278, doi: <a href="https://doi.org/10.1021/acsnano.2c11510" target="_blank">10.1021/acsnano.2c11510</a> (2023)
<div style="margin-left: 30px; margin-top: 6px">
    <b>Accompanying data:</b> D. Campi et al., Materials Cloud Archive 2022.84,
    doi: <a href="https://doi.org/10.24435/materialscloud:36-nd" target="_blank">10.24435/materialscloud:36-nd</a> (2022)
</div>
<div style="margin-left: 30px; margin-top: 6px">
    <b>arxiv:</b> D. Campi et al., arXiv:2210.11301,
    doi: <a href="https://doi.org/10.48550/arXiv.2210.11301" target="_blank">10.48550/arXiv.2210.11301</a> (2022)
</div>
</div> */
}
