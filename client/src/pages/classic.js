import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import cardBack from "../png/cardBack.png";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

let request = require("superagent");
const url = "http://localhost:5050/classicSpeed/";
const response = await request(url + "new");
const gameID = response.body.gameID;

const Classic = () => {
  console.log(response);
  const [gameState, setGameState] = useState(response.body.gameState.gameState);
  console.log(gameState);
  const [hand11, setHand11] = useState(gameState.hand1.at(-1).reference);
  const [hand12, setHand12] = useState(gameState.hand1.at(-2).reference);
  const [hand13, setHand13] = useState(gameState.hand1.at(-3).reference);
  const [hand14, setHand14] = useState(gameState.hand1.at(-4).reference);
  const [hand15, setHand15] = useState(gameState.hand1.at(-5).reference);

  const [hand21, setHand21] = useState(gameState.hand2.at(-1).reference);
  const [hand22, setHand22] = useState(gameState.hand2.at(-2).reference);
  const [hand23, setHand23] = useState(gameState.hand2.at(-3).reference);
  const [hand24, setHand24] = useState(gameState.hand2.at(-4).reference);
  const [hand25, setHand25] = useState(gameState.hand2.at(-5).reference);

  const [playPileLeft, setPlayPileLeft] = useState(gameState.playPileLeft.at(-1).reference);
  const [playPileRight, setPlayPileRight] = useState(gameState.playPileRight.at(-1).reference);
  return (
    <>
    <Container className='container-classic'>
    <div className="cards">
        <Row xs={6}>
          <Col>
            <div className="card">
                <img src={cardBack} alt="back of card" />
                <div className="textOverlay">{gameState.deck1.length}</div>
            </div>
          </Col>
          <Col>
            <div className="card">
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
                <div className="textOverlay">{gameState.deck2.length}</div>
            </div>
          </Col>
        </Row>
      </div>
    </Container> 
    </>
  );
};

export default Classic;
