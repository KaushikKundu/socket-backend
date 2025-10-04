import express from 'express'
import http from 'http'
import { Server } from 'socket.io'

const app = express()
const server = http.createServer(app)
export const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
})

server.listen(4000, () => {
  console.log('Server is running on port 3000')
});

io.on("connection", (socket) => {
    console.log("a user connected");
    socket.on("message", (msg) => {
        socket.broadcast.emit("message", msg);
    });
    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
    socket.on("joinRoom", (room) => {
      socket.join(room);
      console.log(`User joined room: ${room}`);
    });
    socket.on("leaveRoom", (room) => {
      socket.leave(room);
      console.log(`User left room: ${room}`);
    });
    socket.on("roomMessage", ({ room, msg }) => {
      io.to(room).emit("roomMessage", msg);
      console.log(`Message to room ${room}:`, msg);
    });
    socket.on("leaveRoom", (room) => {
      socket.leave(room);
      console.log(`User left room: ${room}`);
    });
});



