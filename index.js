// Import packages
const express = require("express");
const socketIO = require("socket.io");
const path = require("path");

// Configuration
const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');

// Start server
const server = express()
  .use((req, res) => res.sendFile(INDEX) )
 .listen(PORT, () => console.log("Listening on localhost:" + PORT));

// Initiatlize SocketIO
const io = socketIO(server);

// Register "connection" events to the WebSocket
io.on("connection", function(socket) {
  // Register "join" events, requested by a connected client
  socket.on("join", function (room) {
    // join channel provided by client
    socket.join(room)

    socket.on("change_page1", function(chg){
      io.sockets.emit("change_page1", chg);
    })

    socket.on("change_page2", function(){
      io.sockets.emit("change_page2");
    })

    socket.on("change_page3", function(){
      io.sockets.emit("change_page3");
    })

    socket.on("animation", function(data){
      io.sockets.emit("animation", data);
    })

    // Register "image" events, sent by the client
    socket.on("image", function(msg) {
      // Broadcast the "image" event to all other clients in the room
      socket.broadcast.to(room).emit("image", msg);
    });
  })
});