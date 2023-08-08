import { useState, useEffect } from "react";
import { useParams, useLocation } from 'react-router-dom';
import socket from "../socket";
import Timer from "../components/timer";
import Classic from "./classic";
import { useNavigate } from "react-router-dom";

const WaitingRoomPage = () => {
  const location = useLocation();
  const numPlayer = location.state.numPlayer;
  
  const { id } = useParams();
  const [room, setRoom] = useState({});
  const [numPlayerReady, setPlayerReady] = useState(0);
  const [startGame, setStartGame] = useState(false);
  const [showClassic, setShowClassic] = useState(false);
  const navigate = useNavigate();

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
    joinRoom();
    fetchRoom();

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
    console.log("useEffect from numPlayerReady");

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

  useEffect(() => {
    if (startGame) {
      setTimeout(() => {
        setShowClassic(true);
      }, 3000); // 3 seconds
    }
  }, [startGame]);

  const handleReadyPlayer = async () => {
    const updatedNumPlayerReady = numPlayerReady + 1;
    setPlayerReady(updatedNumPlayerReady);
    socket.emit("join_room", { roomId: room._id, numPlayerReady: updatedNumPlayerReady });
  };

  const leaveRoomClick = async() => {
      const roomId = {id: id }
      console.log(roomId);
    try {
        const response = await fetch(`http://localhost:5050/api/room/deleteRoom/${id}`, { 
          method: "DELETE",
          body: JSON.stringify({_id: roomId})
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch room");
        }
        else {
          // altered from navigate to socket.emit
          socket.emit("leave_room", roomId);
          
        }
      } catch (error) {
        console.error(error);
      }

  }
  
  useEffect(()=>{
    const leaveRoom = () => {
      navigate("/lobby");
    }
    socket.on("leave_room", leaveRoom);

    return () => {
      socket.off("leave_room", leaveRoom);
    }
  })  
  
  return (
    <>
      {showClassic ? (
        <Classic numPlayer= {numPlayer} />
      ) : (
        <>
          {startGame ? <Timer /> : null}
          <h1>{"This is waiting room, game type: " + room.gameType}</h1>
          <h2>{room.user1}</h2>
          <h2>{room.user2}</h2>
          <button onClick={handleReadyPlayer}>Ready</button>
		  <div>
        <button onClick={leaveRoomClick}>Leave Room</button>
      </div>
        </>
      )}
    </>
  );
};

export default WaitingRoomPage;
