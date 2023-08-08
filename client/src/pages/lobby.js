import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Col, Container, Form, Row, Card } from "react-bootstrap";
import gameCardtable from "../png/game_card_table.png";
import { useNavigate } from "react-router-dom"; // import the hook

function LobbyPage({ userName }) {
  const navigate = useNavigate();
  const [selectedGame, setSelectedGame] = useState("");
  const [rooms, setRooms] = useState([]);
  const [show, setShow] = useState(false);
  const [insertRoom, setInsertRoom] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function createRoom() {
    let room = {};
    const newRoom = { gameType: selectedGame, user1: userName + "1"};
    await fetch("http://localhost:5050/api/room/createRoom", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRoom),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Server response: " + response.status);
        }
      })
      .then((data) => {
        room = data;
      })
      .catch(error => {
        console.error('Error:', error);
    });
    setInsertRoom(!insertRoom);
    setShow(false);
    navigate(`/waitingroom/${room._id}`, { state: { numPlayer: 1 } });

  }

  async function JoinRoom(roomId) {
    const newUser = {roomId: roomId, user2: userName+"2", numPlayer: 2}
    let room = {};
    await fetch("http://localhost:5050/api/room/updateUser2", {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    }).then((response) =>{
        if(!response.ok){
            throw Error("Fail to update room");
        }
        else{
            return response.json();
        }
    }).then((data) =>{
        room = data;
    }).catch(error =>{
        console.error(error);
    })
    navigate(`/waitingroom/${roomId}`, { state: { numPlayer: 2} });

    setInsertRoom(!insertRoom);
  }

  useEffect(() => {
    async function fetchRooms() {
      try {
        const response = await fetch(
          "http://localhost:5050/api/room/getRooms",
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw Error("No rooms exist");
        }
        const data = await response.json();
        setRooms(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchRooms();
  }, [insertRoom]);

  return (
    <div>
    
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create a New Room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Select
            aria-label="Default select example"
            value={selectedGame}
            onChange={(e) => setSelectedGame(e.target.value)}
          >
            
            <option value="California">California</option>
            <option value="Classic">Classic</option>
          </Form.Select>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={createRoom}>
            Create Room
          </Button>
        </Modal.Footer>
      </Modal>
      <Button
        className="mt-5 mb-5 mx-auto d-block"
        variant="primary"
        size="lg"
        onClick={handleShow}
      >
        Create Room
      </Button>
      <Container>
        <Row>
          {/* The below Col seems empty. Consider populating or removing it. */}
          <Col>
            {rooms.map((room, index) => (
              <Card className={"mb-5"} style={{ width: "18rem" }}>
                <Card.Img
                  crossOrigin="anonymous"
                  variant="top"
                  src={gameCardtable}
                />
                <Card.Body>
                  <Card.Title>{room.gameType}</Card.Title>
                  <Card.Text>{"Createed by: " +  room.user1.slice(0, -1)}</Card.Text>
                  <Button
                    variant="primary"
                    onClick={() => JoinRoom(room._id)}
                  >
                    Join
                  </Button>{" "}
                  <Button variant="secondary">Watch</Button>
                </Card.Body>
              </Card>
            ))}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default LobbyPage;
