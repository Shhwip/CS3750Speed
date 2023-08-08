import express from 'express';
import cors from "cors";
import "./config/loadEnvironment.mjs";
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
    // First, have the user's socket join the room.
    socket.join(data.roomId);
    
    // Notify other clients in the same room that a user has joined.
    socket.to(data.roomId).emit("user_joined", {
      username: data.username, // Assuming you have a username in your data.
      roomId: data.roomId
    });
  
    // Continue with the rest of your logic for "receive_numPlayerReady".
    io.to(data.roomId).emit("receive_numPlayerReady", data);
  });
  
  // added leave room socket
  socket.on("leave_room", (data)=>{
    console.log("leaving room: " + data.id);
    io.to(data.id).emit("leave_room");
  }
  )

  socket.on("disconnect", () => {
    console.log(socket.id + " disconnected");
  });
});

httpServer.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});