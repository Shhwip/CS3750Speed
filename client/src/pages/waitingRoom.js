import {useState, useEffect, React} from "react";
import { useParams } from 'react-router-dom';
import socket from "../socket";



const WaitingRoomPage = () => {
 
  //const room = location.state.room
  const {id} = useParams()
  const [room, setRoom] = useState({});
  const [numPlayerReady, setPlayerReady] = useState(0);
  const [startGame, setStartGame] = useState(false);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response = await fetch(
          `http://localhost:5050/api/room/getRoom/${id}`, // Send the id as part of the URL
          {
            method: "GET", // Use GET method
            credentials: "include",
          }
        );
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch room");
        }
        setRoom(data);
        //join websocket room
        const websocketData = {
          roomId : data._id,
          numPlayerReady: numPlayerReady,
        }
        await socket.emit("join_room", websocketData);
        

      } catch (error) {
        console.error(error);
        // Handle the error here or set some state to display an error message to the user
      }
    };

    fetchRoom();
    
  }, [id]);

  // console.log(room);

  
  useEffect(() => {
    const handleReceiveMessage = (data) => {
      setPlayerReady(data.numPlayerReady);
      if(data.numPlayerReady === 2){
        setStartGame(true);
      }
      console.log(data);
    };

    socket.on("receive_numPlayerReady", handleReceiveMessage);
  
    // Unsubscribe when component unmounts
    return () => {
      socket.off("receive_numPlayerReady", handleReceiveMessage);
    };
    
  }, [socket]);

  const handleReadyPlayer = async () => {
    const updatedNumPlayerReady = numPlayerReady + 1;
    setPlayerReady(updatedNumPlayerReady);

    await socket.emit("join_room", {
      roomId: room._id,
      numPlayerReady: updatedNumPlayerReady,
    });
};

  return (
    <>
      <h1>{"This is waiting room, game type: " + room.gameType}</h1>
      <h2>{room.user1}</h2>
      <h2>{room.user2}</h2>
      <button onClick={handleReadyPlayer}>Ready</button>
    </>
  );
};

export default WaitingRoomPage;
