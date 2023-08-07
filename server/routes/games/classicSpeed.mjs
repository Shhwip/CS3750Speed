import express from 'express';
import { createDeck, draw } from "./deck.mjs";
import db from "../../config/db.mjs";
import { ObjectId } from "mongodb";

const classicSpeed = express.Router();

classicSpeed.get('/new', async (req, res) => {
    let gameState = await newGame();
    res.send({gameState}).status(200);
});

classicSpeed.get('/:gameID', async (req, res) => {
    console.log(req.params.gameID);
    let result = await gameState(req.params.gameID);
    
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
export async function newClassicGame() {
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
    }
    return Promise.resolve(result);
}



export default classicSpeed;