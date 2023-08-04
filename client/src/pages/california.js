import React, { useState, useEffect } from "react";
import cardBack from "../png/cardBack.png";
import spades_2 from "../png/2_of_spades.png"
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

let request = require("superagent");
const url = "http://localhost:5050/game/california/";
const response = await request(url + "new");
const gameID = response.body.gameID;

const CaliforniaSpeed = () => {
  const [gameState, setGameState] = useState(response.body.gameState);
  console.log(gameState);
  const [pile1, setPile1] = useState(gameState.pile1.at(-1).reference);
  const [pile2, setPile2] = useState(gameState.pile2.at(-1).reference);
  const [pile3, setPile3] = useState(gameState.pile3.at(-1).reference);
  const [pile4, setPile4] = useState(gameState.pile4.at(-1).reference);
  const [pile5, setPile5] = useState(gameState.pile5.at(-1).reference);
  const [pile6, setPile6] = useState(gameState.pile6.at(-1).reference);
  const [pile7, setPile7] = useState(gameState.pile7.at(-1).reference);
  const [pile8, setPile8] = useState(gameState.pile8.at(-1).reference);
  
  const [player1deck, setPlayer1deck] = useState(
    gameState.player1deck.at(-1).reference
  );
  const [player2deck, setPlayer2deck] = useState(
    gameState.player2deck.at(-1).reference
  );

   const player1HandOnClick = () =>{
    console.log("I've been clicked player 1 hand")
   }

   const player2HandOnClick = () =>{
    console.log("I've been clicked player 2 hand")
   }

   const onClickPile1 = () =>{
    console.log("I've been clicked pile 1")
   }

   const onClickPile2 = () =>{
    console.log("I've been clicked pile 2")
   }

   const onClickPile3 = () =>{
    console.log("I've been clicked pile 3")
   }

   const onClickPile4 = () =>{
    console.log("I've been clicked pile 4")
   }

   const onClickPile5 = () =>{
    console.log("I've been clicked pile 5")
   }

   const onClickPile6 = () =>{
    console.log("I've been clicked pile 6")
   }

   const onClickPile7 = () =>{
    console.log("I've been clicked pile 7")
   }

   const onClickPile8 = () =>{
    console.log("I've been clicked pile 8")
   }


  return (
    <>
    <Container className='container-california'>
    <div className="cards">
        <Row xs={6}>
          <Col>
            <div className="card">
                <img src={cardBack} alt="back of card" onClick={player1HandOnClick}/>
                <div className="textOverlay">{gameState.player1deck.length}</div>
            </div>
          </Col>
        </Row>
      </div>
      <div className="cards">
        <Row xs={6} sm={6} md={6} lg={6} className="row"> 
          <Col>
          <div className="card">
                <img src={require(`./../png/${pile1}.png`)} alt=""  onClick={onClickPile1}/>
                <div className="textOverlay"></div>
            </div>
          </Col>
          <Col>
            <div className="card">
            <img src={require(`./../png/${pile2}.png`)}  onClick={onClickPile2}/>
            </div>
          </Col>
          <Col>
            <div className="card">
            <img src={require(`./../png/${pile3}.png`)} onClick={onClickPile3} />
            </div>
          </Col>
          <Col>
          <div className="card">
                <img src={require(`./../png/${pile4}.png`)} onClick={onClickPile4}/>
            </div>
          </Col>
        </Row> 
      </div>
      <div className="cards">
        <Row xs={6} sm={6} md={6} lg={6}>
          <Col>
            <div className="card">
            <img src={require(`./../png/${pile5}.png`)} onClick={onClickPile5} />
            </div>
          </Col>
          <Col>
            <div className="card">
            <img src={require(`./../png/${pile6}.png`)} onClick={onClickPile6} />
            </div>
          </Col>
          <Col>
            <div className="card">
            <img src={require(`./../png/${pile7}.png`)} onClick={onClickPile7} />
            </div>
          </Col>
          <Col>
          <div className="card">
                <img src={require(`./../png/${pile8}.png`)} alt="" onClick={onClickPile8} />
            </div>
          </Col>
        </Row>
        <div className="cards">
        <Row xs={6}>
          <Col>
            <div className="card">
                <img src={cardBack} alt="back of card" onClick={player2HandOnClick} />
                <div className="textOverlay">{gameState.player2deck.length}</div>
            </div>
          </Col>
        </Row>
      </div>
      </div>
    </Container> 
    </>
  );
};

export default CaliforniaSpeed;
