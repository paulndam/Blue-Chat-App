import React from "react";
import onlineIcon from "../icons/onlineIcon.png";
import "./UsersOnline.css";

const UsersOnline = ({ users }) => (
  <div className="UsersContainer">
    <div>
      <h2>
        Blue Chat Application{" "}
        <span role="img" aria-label="emoji">
          💬
        </span>
      </h2>
      <h2>
        Developed using React, Express Node and Socket.io{" "}
        <span role="img" aria-label="emoji">
          ❤️
        </span>{" "}
      </h2>
      <h3>
        Please Check it out now!!{" "}
        <span role="img" aria-label="emoji">
          ⬅️
        </span>{" "}
      </h3>
    </div>

    {users ? (
      <div>
        <h2>Users Online</h2>
        <div className="activeusers">
          <h3>
            {users.map(({ name }) => (
              <div key={name} className="activeitem">
                {name}

                <img alt="Online Icon" src={onlineIcon} />
              </div>
            ))}
          </h3>
        </div>
      </div>
    ) : null}
  </div>
);

export default UsersOnline;
