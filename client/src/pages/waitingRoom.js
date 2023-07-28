import React from "react";
import { useLocation } from 'react-router-dom';


const WaitingRoomPage = () => {
  const location = useLocation();
  const room = location.state.room
  console.log(room);
  return (
    <>
      <h1>{"This is waiting room, game type: " + room.gameType}</h1>
      <h2>{room.user1}</h2>
      <h2>{room.user2}</h2>
    </>
  );
};

export default WaitingRoomPage;
