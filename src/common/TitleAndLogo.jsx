import React from "react";

import "./TitleAndLogo.css";

import Mc2dLogo from "../assets/mc2d.png";

import DoiBadge from "./DoiBadge";

export default function TitleAndLogo() {
  return (
    <div className="title-and-logo">
      <div className="title-and-doi">
        <span className="title-span">
          Materials Cloud 2D crystals database (MC2D)
        </span>
        <div className="doi-container">
          <DoiBadge doi_id="az-b2" />
          <DoiBadge doi_id="36-nd" />
        </div>
      </div>
      <img src={Mc2dLogo} className="mc2d-logo"></img>
    </div>
  );
}
