import io from "socket.io-client";

const socket = io.connect("http://localhost:5050");

export default socket;