import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import cardBack from "../png/cardBack.png";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import socket from "../socket";



function Classic({roomID, userName}) {
  let request = require("superagent");
  const url = "http://localhost:5050/classicSpeed/";

  const [gameState, setGameState] = useState({});
  const [hand11, setHand11] = useState("");
  const [hand12, setHand12] = useState("");
  const [hand13, setHand13] = useState("");
  const [hand14, setHand14] = useState("");
  const [hand15, setHand15] = useState("");

  const [hand21, setHand21] = useState("");
  const [hand22, setHand22] = useState("");
  const [hand23, setHand23] = useState("");
  const [hand24, setHand24] = useState("");
  const [hand25, setHand25] = useState("");

  const [playPileLeft, setPlayPileLeft] = useState("");
  const [playPileRight, setPlayPileRight] = useState("");

  const [deck1, setDeck1] = useState({});
  const [deck2, setDeck2] = useState({});

  const [gameID, setGameID] = useState(0);

  const NewGame = async ({userName}) => {
    const response = await request
    .post(url + "new")
    .send({userName: userName, gameID : roomID})
    .set("Accept", "application/json")
    .set("Content-Type", "application/json");
    setGameID(response.body.gameID);
    console.log("new game response")
    console.log(response.body.gameState.gameState);
    const [gameState, setGameState] = useState(response.body.gameState.gameState);
    console.log(gameState);
    settingGameState(gameState);
    
  }

  NewGame(userName);

  useEffect(() => {



    const handleReceiveMessage = (data) => {
      getGameState(userName, gameID);
    };

    socket.on("receive_move", handleReceiveMessage);
  
    // Unsubscribe when component unmounts
    return () => {
      socket.off("receive_move", handleReceiveMessage);
    };
    
  }, [socket]);

  const getGameState = async (userName, gameID) => {
    const response = await request
    .get(url + gameID + "/" + userName);
    setGameState(response.body.gameState);
    settingGameState(gameState);
  }

  function settingGameState(gameState)
  {
    setHand11(gameState.hand1.at(-1).reference);
    setHand12(gameState.hand1.at(-2).reference);
    setHand13(gameState.hand1.at(-3).reference);
    setHand14(gameState.hand1.at(-4).reference);
    setHand15(gameState.hand1.at(-5).reference);

    setHand21(gameState.hand2.at(-1).reference);
    setHand22(gameState.hand2.at(-2).reference);
    setHand23(gameState.hand2.at(-3).reference);
    setHand24(gameState.hand2.at(-4).reference);
    setHand25(gameState.hand2.at(-5).reference);

    setPlayPileLeft(gameState.playPileLeft.at(-1).reference);
    setPlayPileRight(gameState.playPileRight.at(-1).reference);

    setDeck1(gameState.deck1);
    setDeck2(gameState.deck2);
  }

  return (
    <>
    <Container className='container-classic'>
    <div className="cards">
        <Row xs={6}>
          <Col>
            <div className="card">
                <img src={cardBack} alt="back of card" />
                <div className="textOverlay">{deck1}</div>
            </div>
          </Col>
          <Col>
            <div className="card">
              {console.log(hand11)}
              <img src={require(`./../png/${hand11}.png`)} alt={`${hand11}`} />
            </div>
          </Col>
          <Col>
            <div className="card">
                <img src={require(`./../png/${hand12}.png`)} alt={`${hand12}`} />
            </div>
          </Col>
          <Col>
            <div className="card">
                <img src={require(`./../png/${hand13}.png`)} alt={`${hand13}`} />
            </div>
          </Col>
          <Col>
            <div className="card">
                <img src={require(`./../png/${hand14}.png`)} alt={`${hand14}`} />
            </div>
          </Col>
          <Col>
            <div className="card">
                <img src={require(`./../png/${hand15}.png`)} alt={`${hand15}`} />
            </div>
          </Col>
        </Row>
      </div>
      <div className="cards">
        <Row xs={6} sm={6} md={6} lg={6} className="row"> 
          <Col>
          <div className="card">
                <img src={cardBack} alt="back of card" />
                <div className="textOverlay">{gameState.centerDeckLeft.length}</div>
            </div>
          </Col>
          <Col>
            <div className="card">
                <img src={require(`./../png/${playPileLeft}.png`)} alt={`${playPileLeft}`} />
            </div>
          </Col>
          <Col>
            <div className="card">
                <img src={require(`./../png/${playPileRight}.png`)} alt={`${playPileRight}`} />
            </div>
          </Col>
          <Col>
          <div className="card">
                <img src={cardBack} alt="back of card" />
                <div className="textOverlay">{gameState.centerDeckRight.length}</div>
            </div>
          </Col>
        </Row>
      </div>
      <div className="cards">
        <Row xs={6} sm={6} md={6} lg={6}>
          <Col>
            <div className="card">
                <img src={require(`./../png/${hand21}.png`)} alt={`${hand21}`} />
            </div>
          </Col>
          <Col>
            <div className="card">
                <img src={require(`./../png/${hand22}.png`)} alt={`${hand22}`} />
            </div>
          </Col>
          <Col>
            <div className="card">
                <img src={require(`./../png/${hand23}.png`)} alt={`${hand23}`} />
            </div>
          </Col>
          <Col>
            <div className="card">
                <img src={require(`./../png/${hand24}.png`)} alt={`${hand24}`} />
            </div>
          </Col>
          <Col>
            <div className="card">
                <img src={require(`./../png/${hand25}.png`)} alt={`${hand25}`} />
            </div>
          </Col>
          <Col>
          <div className="card">
                <img src={cardBack} alt="back of card" />
                <div className="textOverlay">{deck2}</div>
            </div>
          </Col>
        </Row>
      </div>
    </Container> 
    </>
  );
};

export default Classic;
