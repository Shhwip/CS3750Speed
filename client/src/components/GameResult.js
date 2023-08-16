import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import socket from "../socket";



function GameResult({ gameOver, isWinner, id, setShowGame, userName, setRoom }) {
  // State for modal visibility
  const [show, setShow] = useState(false);
  const [isClickedPlayAgain, setIsClickedPlayAgain] = useState(false);

  // Navigation hook
  const navigate = useNavigate();

  // Handlers for modal open and close
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Handle submission: Close modal and navigate to home

  // Automatically show the modal when game is over
  useEffect(() => {
    if (gameOver) {
      const fetchDataAndUpdate = async () => {
        await updateRecord();
        handleShow();
      };
  
      fetchDataAndUpdate();
    }
  }, [gameOver]);
  

  useEffect(() => {
    const handlePlayAgainEvent = (data) => {
        setIsClickedPlayAgain(data.isClickedPlayAgain);
    };
    
    socket.on("play_again", handlePlayAgainEvent);
    
    return () => {
        socket.off("play_again", handlePlayAgainEvent);
    };
}, []);

  
  async function handlePlayAgain(){
    if(!isClickedPlayAgain){
        setIsClickedPlayAgain(true);
        await fetch(`http://localhost:5050/api/room/classicPlayAgain/${id}`, {
            method: "PUT",
            credentials: "include",

            headers: {
              "Content-Type": "application/json",
            },
          }).then((response) =>{
              if(!response.ok){
                  throw Error("Fail to update room");
              }
              else{
                  return response.json();
              }
          }).then((data) =>{
            setShowGame(false);
            setRoom(data);
            socket.emit("play_again", {isClickedPlayAgain: true})
          }).catch(error =>{
              console.error(error);
          })
    }
    else{
      setShowGame(false);
    }
   
  }

  const leaveRoomClick = async () => {
    const roomId = { id: id};
    try {
      const response = await fetch(
        `http://localhost:5050/api/room/deleteRoom/${id}`,
        {
          method: "DELETE",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ _id: roomId }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch room");
      } else {
        // altered from navigate to socket.emit
        socket.emit("leave_room", roomId);
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  const updateRecord = async() => {
    try {
      console.log(isWinner);
      const response = await fetch(`http://localhost:5050/record/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({isWinner: isWinner, userName: userName})
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed update record!");
      }
    }
    catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Game Over</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Use Bootstrap utility classes for text colors */}
          <p className={isWinner ? "text-success" : "text-danger"}>
            {isWinner ? "You win" : "You lose"}
          </p>
          <div className="d-flex justify-content-center">
            <Button style={{ marginRight: "8px" }} variant="primary" onClick={handlePlayAgain}>
              Play Again
            </Button>
            <Button variant="secondary" onClick={leaveRoomClick}>Leave Room</Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default GameResult;
