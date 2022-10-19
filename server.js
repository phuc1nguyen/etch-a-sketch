const express = require("express");
const PORT = 5000;
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static(__dirname + "/client/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/client/index.html");
});

io.on("connection", (socket) => {
  console.log("user connected");
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
