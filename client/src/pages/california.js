import React, { useState, useEffect } from "react";
import cardBack from "../png/cardBack.png";
import spades_2 from "../png/2_of_spades.png"
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import socket from "../socket";

const request = require("superagent");
const url = "http://localhost:5050/game/california/";

const CaliforniaSpeed = ({ numPlayer, room}) => {
  const [gameState, setGameState] = useState({})
  const [pile1, setPile1] = useState("cardBack");
  const [pile2, setPile2] = useState("cardBack");
  const [pile3, setPile3] = useState("cardBack");
  const [pile4, setPile4] = useState("cardBack");
  const [pile5, setPile5] = useState("cardBack");
  const [pile6, setPile6] = useState("cardBack");
  const [pile7, setPile7] = useState("cardBack");
  const [pile8, setPile8] = useState("cardBack");
  
  const [player1deck, setPlayer1deck] = useState(cardBack);
  const [player2deck, setPlayer2deck] = useState(cardBack);

   const player1HandOnClick = async () =>{
    console.log("I've been clicked player 1 hand")
    await fetch(url + room.gameID + "/" + "scoop", {
      method: "PATCH"
    });

      socket.emit("california_play", {
        id: room._id,
      });
   }

   const player2HandOnClick = () =>{
    console.log("I've been clicked player 2 hand")
   }

   const onClickPile1 = () =>{
    console.log("I've been clicked pile 1")
    moveHandler({play: 1});
   }

   const onClickPile2 = () =>{
    console.log("I've been clicked pile 2")
    moveHandler({play: 2});
   }

   const onClickPile3 = () =>{
    console.log("I've been clicked pile 3")
    moveHandler({play: 3});
   }

   const onClickPile4 = () =>{
    console.log("I've been clicked pile 4")
    moveHandler({play: 4});
   }

   const onClickPile5 = () =>{
    console.log("I've been clicked pile 5")
    moveHandler({play: 5});
   }

   const onClickPile6 = () =>{
    console.log("I've been clicked pile 6")
    moveHandler({play: 6});
   }

   const onClickPile7 = () =>{
    console.log("I've been clicked pile 7")
    moveHandler({play: 7});
   }

   const onClickPile8 = () =>{
    console.log("I've been clicked pile 8")
    moveHandler({play: 8});
   }

   const moveHandler = async (data) => {
    console.log(room._id);
    console.log(numPlayer);
    if(numPlayer === 1)
    {
      await fetch(url + room.gameID + "/" + data.play + "/" + numPlayer, {
        method: "PATCH",
      });
    } else if(numPlayer === 2)
    {
      let play = ((data.play + 4) % 8);
      if(play === 0)
      {
        play = 8;
      }
      await fetch(url + room.gameID + "/" + play + "/" + numPlayer, {
        method: "PATCH",
      });
    }
    const emitEvent = () => {
      socket.emit("california_play", {
        id: room._id,
      });
  };
  emitEvent();
}

   // get all the cards ready
   useEffect(() => {

    (async () => {
      const response = await fetch(url + room.gameID);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
      
      const body = await response.json();
      console.log(body);
      setGameState(body);
      if(numPlayer === 1)
      {
        setPlayer1deck(body.player2deck);
        setPlayer2deck(body.player1deck);
        setPile1(body.pile1.reference);
        setPile2(body.pile2.reference);
        setPile3(body.pile3.reference);
        setPile4(body.pile4.reference);
        setPile5(body.pile5.reference);
        setPile6(body.pile6.reference);
        setPile7(body.pile7.reference);
        setPile8(body.pile8.reference);
      }else if(numPlayer === 2)
      {
        setPlayer1deck(body.player1deck);
        setPlayer2deck(body.player2deck);
        setPile1(body.pile5.reference);
        setPile2(body.pile6.reference);
        setPile3(body.pile7.reference);
        setPile4(body.pile8.reference);
        setPile5(body.pile1.reference);
        setPile6(body.pile2.reference);
        setPile7(body.pile3.reference);
        setPile8(body.pile4.reference);
      }
    })();

  }, []);

  useEffect(() => {

    const getGameState = async () => {
      console.log("getGameState from emit");
      const response = await fetch(url + room.gameID);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
      
      const body = await response.json();
      console.log(body);
      setGameState(body);
      if(numPlayer === 1)
      {
        setPlayer1deck(body.player2deck);
        setPlayer2deck(body.player1deck);
        setPile1(body.pile1.reference);
        setPile2(body.pile2.reference);
        setPile3(body.pile3.reference);
        setPile4(body.pile4.reference);
        setPile5(body.pile5.reference);
        setPile6(body.pile6.reference);
        setPile7(body.pile7.reference);
        setPile8(body.pile8.reference);
      }else if(numPlayer === 2)
      {
        setPlayer1deck(body.player1deck);
        setPlayer2deck(body.player2deck);
        setPile1(body.pile5.reference);
        setPile2(body.pile6.reference);
        setPile3(body.pile7.reference);
        setPile4(body.pile8.reference);
        setPile5(body.pile1.reference);
        setPile6(body.pile2.reference);
        setPile7(body.pile3.reference);
        setPile8(body.pile4.reference);
      }
    }
    socket.on("california_play", getGameState);

    return () => {
      socket.off("california_play", getGameState);
    };
    
  }, [socket]);


  return (
    <>
    <Container className='container-california'>
    <div className="cards">
        <Row xs={6}>
          <Col>
            <div className="card" onClick={player1HandOnClick}>
                <img src={cardBack} alt="back of card" />
                <div className="textOverlay">{player1deck}</div>
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
                <div className="textOverlay">{player2deck}</div>
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
