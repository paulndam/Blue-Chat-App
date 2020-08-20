import React from "react";
import "./Messages.css";
import ScrollToBottom from "react-scroll-to-bottom";
import Message from "./Message.js";

const Messages = ({ messages, name }) => (
  //maping our messages that will send by users and as well as looping thru each and every single messages
  <ScrollToBottom className="messages">
    {messages.map((message, i) => (
      <div key={i}>
        <Message message={message} name={name} />{" "}
      </div>
    ))}
  </ScrollToBottom>
);

export default Messages;
