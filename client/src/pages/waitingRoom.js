import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Classic from "./classic";
import socket from "../socket";
import Timer from "../components/timer";


const WaitingRoomPage = () => {
  const { id } = useParams();
  const [room, setRoom] = useState({});
  const [numPlayerReady, setPlayerReady] = useState(0);
  const [startGame, setStartGame] = useState(false);

  const fetchRoom = async () => {
    try {
      const response = await fetch(`http://localhost:5050/api/room/getRoom/${id}`, { method: "GET", credentials: "include" });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch room");
      }
      setRoom(data);
    } catch (error) {
      console.error(error);
    }
  };

  const joinRoom = () => {
    const websocketData = { roomId: id, numPlayerReady: numPlayerReady };
    socket.emit("join_room", websocketData);
  };

  useEffect(() => {

    const handleUserJoined = () => {
      console.log('Another user joined the room');
      fetchRoom();
    };

    socket.on("user_joined", handleUserJoined);

    return () => {
      socket.off("user_joined", handleUserJoined);
    };
  }, []);

  useEffect(() => {
    joinRoom();

    const handleReceiveMessage = (data) => {
      setPlayerReady(data.numPlayerReady);
      if (data.numPlayerReady === 2) {
        setStartGame(true);
      }
    };

    socket.on("receive_numPlayerReady", handleReceiveMessage);

    return () => {
      socket.off("receive_numPlayerReady", handleReceiveMessage);
    };
  }, [numPlayerReady]);

  const handleReadyPlayer = async () => {
    const updatedNumPlayerReady = numPlayerReady + 1;
    setPlayerReady(updatedNumPlayerReady);
    socket.emit("join_room", { roomId: room._id, numPlayerReady: updatedNumPlayerReady });
  };

  return (
    <>
      {startGame ? <Timer /> : null}
      <h1>{"This is waiting room, game type: " + room.gameType}</h1>
      <h2>{room.user1}</h2>
      <h2>{room.user2}</h2>
      <button onClick={handleReadyPlayer}>Ready</button>
    </>
  );
};

export default WaitingRoomPage;
