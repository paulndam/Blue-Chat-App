import React from "react";
import closeIcon from "../icons/closeIcon.png";
import onlineIcon from "../icons/onlineIcon.png";
import "./Infobar.css";

const Infobar = ({ room }) => (
  <div className="infobar">
    <div className="leftincontainer">
      <img className="onlineIcon" src={onlineIcon} alt="online" />
      <h3>Room {room}</h3>
    </div>

    <div className="rightincontainer">
      <a href="/">
        <img src={closeIcon} alt="Close"></img>
      </a>
    </div>
  </div>
);

export default Infobar;
