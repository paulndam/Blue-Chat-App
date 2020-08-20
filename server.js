const express = require("express");

// const path = require("path");

const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");
const {
  addUser,
  removeUser,
  getUser,
  getUserInRoom,
} = require("./server/models/users");

const PORT = process.env.PORT || 5000;

const router = require("./server/routes/router");
const app = express();

// const publicPath = path.join(__dirname, "..", "public");
// here we are using http to initialize and create our server amd as well as passing in our app as an argument
const server = http.createServer(app);

// same here as for our socket
const io = socketio(server);

app.use(router);
app.use(cors());

// app.use(express.static(publicPath));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(publicPath, "index.html"));
// });

//now intergrating our socketio
//all our code are gonna be running in side this function
io.on("connection", (socket) => {
  console.log("we got new connection");

  //listening to event from front end and then transmitting the data
  //we can also pass in a callback and make use of it inside the socket.on
  //the callback does a job of triggering a response, and also some error handling
  socket.on("join along", ({ name, room }, callback) => {
    // passing in two parameters in our variable which will be the error and the user object and then calling our adduser function as well as implementing the id of the socket or connection that the user will be connected to or using
    const { error, user } = addUser({ id: socket.id, name, room });

    // now saying or checking for any errors and if so then we use or call back error function that we inserted earlier
    if (error) return callback(error);

    //if no errors, then users can now join the chat and we do by simply using socket.join

    socket.join(user.room);

    //doing a simple emit to welcomes user in their various rooms
    io.emit("message", {
      user: "Blue",
      text: `${user.name}, welcome to the chatroom ${user.room}`,
    });

    //welcoming a user when they join a chat
    // using socket.broadcast.to , specifying what room we are sending the information except the user who sends the info or message
    //admin generated message, which in this case is called blue will be named as message and user generated message will be named as sendMessage. w
    socket.broadcast
      .to(user.room)
      .emit("message", { user: "Blue", text: `${user.name}, has joined` });

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUserInRoom(user.room),
    });

    //making logic to see the users that are in the room
    //using io.to, passing in our user.room as our argument cause we are trying to get the user's room and then as also the  the user itself
    //e are also gonna insert our getuserinroom function that we created.

    // io.to(user.room).emit("roomData", {
    //   room: user.room,
    //   users: getUserInRoom(user.room),
    // });

    // callback , if no errors it will get pass and the errors function at the front end will ass pass if no errors
    callback();

    // when user in room we can add in messaging
    console.log(`User's name is ${name} and Chat room is ${room}`);

    // const error = true;

    // if (error) {
    //   callback({ error: "error" });
    // }
  });

  //creating events to generate messages
  //user generated message will be called sendMessage
  socket.on("sendMessage", (message, callback) => {
    //getting user that send the message and their id

    const user = getUser(socket.id);
    console.log(user);
    //SENDING THE MESSAGE TO SPECIFIED ROOM
    io.to(user.room).emit("message", { user: user.name, text: message });

    //using callback function to do something after message is been send from front end

    callback();
    console.log(message);
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit("message", {
        user: "Blue",
        text: `${user.name} has left.`,
      });
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUserInRoom(user.room),
      });
    }
    console.log("user left");
  });
});

// now having to set up our port and make it listen and responsive as well as also requiring and specifying what port we want to use

server.listen(PORT, () => console.log(`server up and running on port ${PORT}`));

// server.listen(process.env.PORT || 5000, () =>
//   console.log(`Server has started.`)
// );

// app.listen(process.env.PORT || 3000, function () {
//   console.log(
//     "Express server listening on port %d in %s mode",
//     this.address().port,
//     app.settings.env
//   );
// });
