import React, { useState, useEffect} from "react";
import clubs2 from "../png/2_of_clubs.png";
import cardBack from "../png/cardBack.png";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import { Button } from "react-bootstrap";

let request = require('superagent');
const url = 'http://localhost:5050/game/california/';
const response = await request(url + 'new');
const gameID = response.body.gameID;

function Pile(props) {
    return(
        <div className="pile">
            <Image></Image>
            </div>
    );
}


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
    const [player1deck, setPlayer1deck] = useState(gameState.player1deck.at(-1).reference);
    const [player2deck, setPlayer2deck] = useState(gameState.player2deck.at(-1).reference);

    


    return (
        <Container fluid
        style={{
            background: "green",
            height: "100vh"
        }}>
            <Row className="justify-content-md-center h-25">
                <Col md={2}>
                    <Image className="card" src={cardBack} />
                </Col>
            </Row>
            <Row className="justify-content-md-center my-2 h-25">
                <Col className="mx-auto" md={2}>
                    <Image className="card" src={require(`./../png/${pile1}.png`)} />
                </Col>
                <Col className="mx-auto" md={2}>
                    <Image className="card" src={require(`./../png/${pile2}.png`)} />
                </Col>
                <Col className="mx-auto" md={2}>
                    <Image className="card" src={require(`./../png/${pile3}.png`)} />
                </Col>
                <Col className="mx-auto" md={2}>
                    <Image className="card" src={require(`./../png/${pile4}.png`)} />
                </Col>
            </Row>
            <Row className="justify-content-md-center my-2 h-25">
                <Col className="mx-auto" md={2}>
                    <Image className="card" src={require(`./../png/${pile5}.png`)} />
                </Col>
                <Col className="mx-auto" md={2}>
                    <Image className="card" src={require(`./../png/${pile6}.png`)} />
                </Col>
                <Col className="mx-auto" md={2}>
                    <Image className="card" src={require(`./../png/${pile7}.png`)} />
                </Col>
                <Col className="mx-auto" md={2}>
                    <Image className="card" src={require(`./../png/${pile8}.png`)} />
                </Col>
            </Row>
            <Row className="justify-content-md-center h-25">
                <Col md={2}>
                    <Image className="card" src={require(`./../png/${player1deck}.png`)} />
                </Col>
            </Row>
        </Container>

    );
};

export default CaliforniaSpeed;


