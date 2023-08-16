import { useState, useEffect } from "react";
import { useParams, useLocation } from 'react-router-dom';
import socket from "../socket";
import Classic from "./classic";
import CaliforniaSpeed from "./california";
import { useNavigate } from "react-router-dom";
import WaitingModal from "../components/modals";
import TimerModal from "../components/modalTimer";
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';


const WaitingRoomPage = () => {

  const location = useLocation();
  const numPlayer = location.state.numPlayer;
  const userName = location.state.userName;
  const { id } = useParams();
  const [room, setRoom] = useState({});
  const [numPlayerReady, setPlayerReady] = useState(0);
  const [startGame, setStartGame] = useState(false);
  const [showClassic, setShowClassic] = useState(false);
  const [showCalifornia, setShowCalifornia] = useState(false);
  const [showGame, setShowGame] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalTimer, setShowModalTimer] = useState(false);
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
   
    fetchRoom();
    joinRoom();

    const handleUserJoined = (data) => {
      console.log('Another user joined the room');
      setPlayerReady(data.numPlayerReady)
      // fetchRoom();
      // joinRoom();

    };

    socket.on("user_joined", handleUserJoined);

    return () => {
      socket.off("user_joined", handleUserJoined);
    };
  }, []);

  useEffect(() => {

    const handleReceiveMessage = (data) => {
      console.log("READY: " + numPlayerReady)
      setPlayerReady(data.numPlayerReady);
      if (data.numPlayerReady === 2) {
        setStartGame(true);
        setShowModal(false);
        setShowModalTimer(true);
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
        setShowGame(true);
        setShowModal(false)
        setStartGame(false);
        setPlayerReady(0)
      }, 3000); // 3 seconds
    }
  }, [startGame]);

  const handleReadyPlayer = async () => {
    const updatedNumPlayerReady = numPlayerReady + 1;
    setPlayerReady(updatedNumPlayerReady)
    socket.emit("join_room", { roomId: room._id, numPlayerReady: updatedNumPlayerReady });
    setShowModal(true);

  };

  const handlePlayerClose = () => {
    const updatedNumPlayerReady = numPlayerReady - 1;
    setPlayerReady(updatedNumPlayerReady)
    socket.emit("join_room", { roomId: room._id, numPlayerReady: updatedNumPlayerReady });
    setShowModal(false);
  }

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
  useEffect(() => {
    const leaveRoom = () => {
      navigate("/lobby");
    }
    socket.on("leave_room", leaveRoom);

    return () => {
      socket.off("leave_room", leaveRoom);
    }
  })

  if (numPlayerReady == 0) {
    var checkPlayerReady = "NO"
  }
  else {
    checkPlayerReady = "YES"
  }

  
  return (
    <>
      {showGame ? ( room.gameType === "Classic" ? <Classic numPlayer={numPlayer} room={room} setShowGame={setShowGame} setRoom = {setRoom} userName={userName} /> :
        <CaliforniaSpeed numPlayer={numPlayer} room={room} setShowClassic={setShowClassic} setPlayerReady={setPlayerReady} setStartGame={setStartGame} userName={userName} />
      ) : (
        <>
          <h1 className="waitingRoom-title">{"WAITING ROOM"} </h1>
          <h2>{"Game Type: " + room.gameType}</h2>
          <CardGroup className="position-relative w-50">
            <Card className="m-5">
              <Card.Img variant="top" src="https://images.squarespace-cdn.com/content/v1/50f79c6fe4b00d3480c9bbf0/1603139268457-L8WP2GF1EDTQS1YIEJLY/LinkedIn-Silhouette.jpg" />
              <Card.Body>
                <Card.Title>USER:</Card.Title>
                <Card.Text>
                  {(numPlayer===1) ? room.user1 : room.user2}
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <button onClick={handleReadyPlayer}>Ready</button>
                <button onClick={leaveRoomClick}>Leave Room</button>
              </Card.Footer>
            </Card>
            <Card className="m-5">
              <Card.Img variant="top" src="https://images.squarespace-cdn.com/content/v1/50f79c6fe4b00d3480c9bbf0/1603139268457-L8WP2GF1EDTQS1YIEJLY/LinkedIn-Silhouette.jpg" />
              <Card.Body>
                <Card.Title>USER:</Card.Title>
                <Card.Text>
                  {(numPlayer===2) ? room.user1 : room.user2}
                </Card.Text>
                <Card.Footer>
                  Player Ready: {checkPlayerReady}
                </Card.Footer>
              </Card.Body>
            </Card>
            <div className="m-5">
              {startGame ? <TimerModal show={showModalTimer} onHide={() => setShowModalTimer(false)} /> : null}
            </div>
          </CardGroup>
          <div className="row">
            <h3>Players Ready: {numPlayerReady} </h3>
            <WaitingModal show={showModal} handleClose={handlePlayerClose} />
          </div>
        </>
      )}
    </>
  );
};

export default WaitingRoomPage;
