require("dotenv").config();
const cors = require("cors");
const http = require("http");
const express = require("express");
const mongoose = require("mongoose");
const { Server } = require("socket.io");

const questionRoutes = require("./routes/questionRoutes");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

//middleware
app.use(
  cors({
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
app.use(express.json());

//routes
app.use("/api/question", questionRoutes);

// Socket.IO connection for real-time updates
io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);
  socket.on("disconnect", () => {
    socket.disconnect();
    console.log("🔥: A user disconnected");
  });
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    // listen for requests
    console.log("Connected to DB");
  })
  .catch((error) => {
    console.log(error);
  });

server.listen(process.env.PORT);

const socketIO = io;
module.exports.io = socketIO;
