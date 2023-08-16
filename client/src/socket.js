import io from "socket.io-client";

const socket = io.connect("http://3.89.204.193:5050");

export default socket;