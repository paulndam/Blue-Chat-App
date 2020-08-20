import React from "react";
import "./Message.css";
import ReactEmoji from "react-emoji";

//passing these args in functional components since our message was an object that had both user and text, and with that being said we can use the properties and the set and display our user with their names or name and as well as the entire text body.

const Message = ({ message: { user, text }, name }) => {
  // assigning a variable that set current message send by user to be false
  // and the we are also gonna make sure the name is set to lowercase

  let sentByCurrentUser = false;

  const trimeName = name.trim().toLowerCase();

  //now doing our logic and checking to see if the user matches the timName, and if that's the case then we set it to true

  if (user === trimeName) {
    sentByCurrentUser = true;
  }

  return (
    //doing the teniray operator saying that if the text i send by the user then perform the following code below
    sentByCurrentUser ? (
      <div className="messageContainer justifyEnd">
        {/* setting the user name who sends the text */}
        <p className="sentText pr-10">{trimeName}</p>
        <div className="messageBox backgroundBlue">
          {/* setting text and displaying it that the user will send  */}
          <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
        </div>
      </div>
    ) : (
      // if the text is not send by user then do the following code below
      <div className="messageContainer justifyStart">
        <div className="messageBox backgroundLight">
          <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
        </div>
        <p className="sentText pl-10">{user}</p>
      </div>
    )
  );
};

export default Message;
