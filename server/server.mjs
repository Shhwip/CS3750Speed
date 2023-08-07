import express from 'express';
import cors from "cors";
import "./config/loadEnvironment.mjs";
import db from "./config/db.mjs"
import californiaSpeed from "./routes/games/californiaSpeed.mjs"
import classicSpeed from "./routes/games/classicSpeed.mjs"
import api from "./routes/api.mjs"
import deck from "./routes/deck.mjs"
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

// Added for websockets/socket.io
// run npm install socket.io
import { createServer } from "http";
import { Server } from "socket.io";
//

const app = express();

//please keep the port consistence
const port = 5050;

//const router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use("/", deck);
app.use("/game", californiaSpeed);
app.use("/classicSpeed", classicSpeed);
app.use(express.json());



app.use('/api', api);

//app.use('/', router);

// Start the server
// app.listen(port, () => {
//   console.log(`Server is listening on port ${port}`);
// });

// socket.io additions
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  }
});

io.on("connection", (socket) => {
  console.log(socket.id + " conncted");

  socket.on("send_message", (data) =>{
    io.emit("receive_message", (data));
    console.log(data);
  });

  socket.on("msg", (data) => {
    console.log(data);
    io.emit("receive_message", (data));
  });

  socket.on("join_room", (data) => {
    //console.log(data);
    //console.log(`${data.numPlayer} has entered room: ${data.roomName}`);
    io.to(data.roomId).emit("receive_numPlayerReady", data);
    io.emit("receive_numPlayerReady", (data))
    socket.join(data.roomId);
  })

  socket.on("make_move", (data) => {
    console.log(data);
    io.to(data.roomId).emit("receive_move", data);
  })

  socket.on("disconnect", () => {
    console.log(socket.id + " disconnected");
  });
});

httpServer.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});