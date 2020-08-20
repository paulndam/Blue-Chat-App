import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Join.css";
const Join = () => {
  const [name, setname] = useState("");
  const [room, setroom] = useState("");

  return (
    <div className="container-fluid">
      <div className="containerjoin">
        <h3 className="header">Join Bluechat</h3>
        <div>
          <input
            placeholder="Name"
            className="join"
            type="text"
            onChange={(e) => setname(e.target.value)}
          ></input>
        </div>
        <div>
          <input
            placeholder="Room"
            className="join"
            type="text"
            onChange={(e) => setroom(e.target.value)}
          ></input>
        </div>
        <Link
          onClick={(e) => (!name || !room ? e.preventDefault() : null)}
          to={`/chat?name=${name}&room=${room}`}
        >
          <button className="btn btn-warning btn-md mt-20" type="submit">
            sign in
          </button>
        </Link>
      </div>
    </div>
  );
};
export default Join;
