const io = require("socket.io")(3000, {
  cors: {
    origin: ["http://localhost:8080"],
  },
});

// runs everytime client connects to server
// gives them each a socket instance
// gives them unique id
io.on("connection", (socket) => {
  console.log(socket.id);
  //  listens to 'send-message'
  socket.on("send-message", (message, room) => {
    // sends 'send-message' to all other sockets
    if (room === '') {
      socket.broadcast.emit('receive-message', message)
    } else {
      // assumes broadcast mode when using socket.to()
      socket.to(room).emit('receive-message', message)
    }
  });
  // Joining custom rooms
  socket.on("join-room", (room, callBack) => {
     socket.join(room)
     callBack(`Joined '${room}'`)
  })
});
