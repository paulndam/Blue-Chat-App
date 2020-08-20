import React from "react";
import closeIcon from "../icons/closeIcon.png";
import onlineIcon from "../icons/onlineIcon.png";
import "./Input.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Input = ({ message, setmessage, sendMessage }) => (
  <form className="form">
    <input
      className="input"
      type="text"
      placeholder="message here ..."
      value={message}
      onChange={(e) => setmessage(e.target.value)}
      onKeyPress={(e) => (e.key === "Enter" ? sendMessage(e) : null)}
    />
    <button className="sendit  btn-md" onClick={(e) => sendMessage(e)}>
      Send
    </button>
  </form>
);

export default Input;
