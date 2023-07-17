import express from 'express';
import db from "../../config/db.mjs";
import CARDS from "../../resources/cardslist.mjs";
import { ObjectId } from "mongodb";

const californiaSpeed = express.Router();

// ----------------------------------------------
// return fake game state data for testing
// url: /game/test
// request body: userType: string
californiaSpeed.get('/california/test', async (req, res) => {
    //let query = { _id: ObjectId(req.body.user_id) };
    //let collection = await db.collection("users");
    //let userType = collection.find(query).userType;
    let userType = req.body.userType;
    //fake gamestate
    //TODO replace with actual gamestate
    //From server
    let gameState = {
        "player1deck": [1,35,36,37,38,39],
        "player2deck": [2,40,41,42,43,44],
        "pile1": [3,4,5,6],
        "pile2": [7,8,9,10],
        "pile3": [11,12,13,14],
        "pile4": [15,16,17,18],
        "pile5": [19,20,21,22],
        "pile6": [23,24,25,26],
        "pile7": [27,28,29,30],
        "pile8": [31,32,33,34],
    }
    let response = {
        "gameState": {
            "player1deck": {
                "card": gameState.player1deck[0],
                "rank": (gameState.player1deck[0] % 13) + 1,
                "reference":CARDS[gameState.player1deck[0] - 1]
            },
            "player2deck": {
                "card": gameState.player2deck[0],
                "rank": (gameState.player2deck[0] % 13) + 1,
                "reference":CARDS[gameState.player2deck[0] - 1]
            },
            "pile1": {
                "card": gameState.pile1[-1],
                "rank": (gameState.pile1[-1] % 13) + 1,
                "reference":CARDS[gameState.pile1[-1] - 1]
            },
            "pile2": {
                "card": gameState.pile2[-1],
                "rank": (gameState.pile2[-1] % 13) + 1,
                "reference":CARDS[gameState.pile2[-1] - 1]
            },
            "pile3": {
                "card": gameState.pile3[-1],
                "rank": (gameState.pile3[-1] % 13) + 1,
                "reference":CARDS[gameState.pile3[-1] - 1]
            },
            "pile4": {
                "card": gameState.pile4[-1],
                "rank": (gameState.pile4[-1] % 13) + 1,
                "reference":CARDS[gameState.pile4[-1] - 1]
            },
            "pile5": {
                "card": gameState.pile5[-1],
                "rank": (gameState.pile5[-1] % 13) + 1,
                "reference":CARDS[gameState.pile5[-1] - 1]
            },
            "pile6": {
                "card": gameState.pile6[-1],
                "rank": (gameState.pile6[-1] % 13) + 1,
                "reference":CARDS[gameState.pile6[-1] - 1]
            },
            "pile7": {
                "card": gameState.pile7[-1],
                "rank": (gameState.pile7[-1] % 13) + 1,
                "reference":CARDS[gameState.pile7[-1] - 1]
            },
            "pile8": {
                "card": gameState.pile8[-1],
                "rank": (gameState.pile8[-1] % 13) + 1,
                "reference":CARDS[gameState.pile8[-1] - 1]
            },
        },
    }

    if(userType === "player1")
    {
        response.gameState.player2deck = null;
    }
    else if(userType === "player2")
    {
        response.gameState.player1deck = null;
    }
    res.send(response).status(200);

});

export default californiaSpeed;