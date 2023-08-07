import express from 'express';
import { createDeck, draw } from "./deck.mjs";
import db from "../../config/db.mjs";
import { ObjectId } from "mongodb";

const classicSpeed = express.Router();

classicSpeed.post('/new', async (req, res) => {
    let userName = req.body.userName;
    let gameID = req.body.gameID;
    let gameState = await newGame();

    let player = async (userName, gameID) => {
        let collection = db.collection("Game-Room");
        let query = {_id: new ObjectId(gameID)};
        let gameRoom = await collection.findOne(query);
        console.log(gameRoom);
        console.log(gameRoom.user1 === userName);
        if(gameRoom.user1 === userName) {
            return "player1";
        } else if(gameRoom.user2 === userName) {
            return "player2";
        }else {
            return "spectator";
        }
    }
    player = await player(userName, gameID);
    console.log(player);
    if(player === "player1") {
        gameState.gameState.hand2 = [];
        console.log(gameState.hand2);
        gameState.gameState.deck2 = [];
    } else if(player === "player2") {
        gameState.gameState.hand1 = [];
        gameState.gameState.deck1 = [];
    }
    console.log(gameState);
    res.send({gameState}).status(200);
});

classicSpeed.get('/:gameID/:userName', async (req, res) => {
    console.log(req.params);
    gameID = req.params.gameID;
    userName = req.params.userName;
    let result = await gameState(req.params.gameID);

    let player = async (userName, gameID) => {
        let collection = db.collection("Game-Room");
        let query = {_id: new ObjectId(gameID)};
        let gameRoom = await collection.findOne(query);
        if(gameRoom.user1 === userName) {
            return "player1";
        } else if(gameRoom.user2 === userName) {
            return "player2";
        }else {
            return "spectator";
        }
    }

    if(player === "player1") {
        result.gameState.hand2 = [];
        result.gameState.deck2 = [];
    } else if(player === "player2") {
        result.gameState.hand1 = [];
        result.gameState.deck1 = [];
    }

    res.send(result).status(200);
});

// ----------------------------------------------
// get game state
async function gameState(gameID) {
    let collection = db.collection("classicSpeedGames");
    let query = {_id: new ObjectId(gameID)};
    let gameState = collection.findOne(query);
    return Promise.resolve(gameState);
}


// ----------------------------------------------
// New Game
async function newGame(player) {
    let deckID = await createDeck();
    console.log(deckID);
    let deck = await draw(deckID, 52);
    let gameState = {
        hand1: deck.slice(0, 5),
        hand2: deck.slice(5, 10),
        deck1: deck.slice(10, 25),
        deck2: deck.slice(25, 40),
        centerDeckLeft: deck.slice(40, 45),
        centerDeckRight: deck.slice(45, 50),
        playPileLeft: deck.slice(50, 51),
        playPileRight: deck.slice(51, 52),
    }

    let collection = db.collection("classicSpeedGames");
    let gameID = await collection.insertOne(gameState);
    let result = {
        gameID: gameID.insertedId,
        gameState: gameState
    }
    return Promise.resolve(result);
}



export default classicSpeed;