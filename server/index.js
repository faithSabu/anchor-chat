const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:5173", methods: ["GET", "POST"] },
});

io.on("connection", socket => {
    console.log(`a user connected ${socket.id}`);

    socket.on("send_message", (data) => {
        socket.to("IMO8qghKCvw_bvJOAAAH").emit("receive_message",{message: "Hello "})
        socket.broadcast.emit("receive_message", data)
    })
})

server.listen(4000, () => console.log("listening on port:4000"));
