import React, { useState, useEffect } from "react";
import "./Chat.css";
import queryString from "query-string";
import io from "socket.io-client";
import "./Chat.css";
import Infobar from "./Infobar.js";
import Input from "./Input.js";
import Messages from "./Messages.js";
import UsersOnline from "./UsersOnline.js";

//creating a temp variable for our socket

let socket;

const Chat = ({ location }) => {
  const [name, setname] = useState("");
  const [room, setroom] = useState("");
  const [users, setusers] = useState("");
  //using useState to store all our messages and we need to set them
  //and have a const to specify all single messages and we can push it in our useeffect below
  const [message, setmessage] = useState("");
  const [messages, setmessages] = useState([]);
  const ENDPOINT = "localhost:5000";

  useEffect(() => {
    //retrieving data from user while they join the chat, we do that by using the querystring and the parse it
    // location is from react router
    const { name, room } = queryString.parse(location.search);

    // when we get our first connection we are going to set our socket to a connection
    socket = io(ENDPOINT);

    setname(name);
    setroom(room);

    // socket.emit will send an event or connection to our backend server included the user name and room that we passed in as objects and on the other hand at our back it will be ready to listen to an event with the same matching words "come on"

    socket.emit("join along", { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });

    //line of code below is for when a user get disconnected or leaves chat
    //needs to make our event listener data is the same like the backend and in this case it is disconnect
    // return () => {
    //   socket.emit("disconnect");

    //   //socket.off will just turn off that particular instance of what user gets disconnected
    //   socket.off();
    // };
  }, [ENDPOINT, location.search]);

  //making a second useeffect function for handling messages

  useEffect(() => {
    socket.on("message", (message) => {
      setmessages((messages) => [...messages, message]);
    });
    socket.on("roomData", ({ users }) => {
      setusers(users);
    });
  }, []);

  //now making function to send and recieve messages

  const sendMessage = (e) => {
    e.preventDefault();

    //now saying that if there is any messages being sent we are going to use the socket.emit to pass that data or information which our back end sever will be listening to (sendMessage)
    // we also need to pass in two other arguments in our emit which will the message it self when someone sends a message, then our callback function to clear out that message being send and then be set back to empty string , ready for a new message

    if (message) {
      socket.emit("sendMessage", message, () => setmessage(""));
    }
  };
  console.log(message, messages);

  return (
    <div className="containeroutside">
      <div className="container">
        <Infobar room={room} />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setmessage={setmessage}
          sendMessage={sendMessage}
        />
        {/* <input
          value={message}
          onChange={(e) => setmessage(e.target.value)}
          //   on key press is for actually sending our messages and if the user press the enter which is what our function is ready to listen to, it will send the send message but if the enter key is not pressed or enter then our function does nada
          onKeyPress={(e) => (e.key === "Enter" ? sendMessage(e) : null)}
        /> */}
      </div>
      <UsersOnline users={users} />
    </div>
  );
};
export default Chat;
