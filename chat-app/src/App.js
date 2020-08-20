import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Join from "./components/Join.js";
import Chat from "./components/Chat.js";
// import UsersOnline from "./components/UsersOnline.js";

const App = () => {
  return (
    <Router>
      {/* when user join they will go thru this route and then later on send the to the chat route */}
      <Route path="/" exact component={Join} />
      <Route path="/chat" component={Chat} />
      {/* <Route path="/usersonline" component={UsersOnline} /> */}
    </Router>
  );
};

export default App;
