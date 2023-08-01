import {useState, useEffect, React} from "react";
import { useLocation } from 'react-router-dom';
import socket from '../socket';


const WaitingRoomPage = () => {
  const location = useLocation();
  const room = location.state.room
  console.log(room);

  const [playerReady, setPlayerReady] = useState(1);
  const roomData = {
    ready: playerReady,
    room: room,
  }
  if (room.user2 !== ''){
    setPlayerReady(2);
  }
  socket.emit("join_room", roomData);


  return (
    <>
      <h1>{"This is waiting room, game type: " + room.gameType}</h1>
      <h2>{room.user1}</h2>
      <h2>{room.user2}</h2>
    </>
  );
};

export default WaitingRoomPage;
