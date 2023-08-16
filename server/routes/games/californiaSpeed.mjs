import express from 'express';
import { createDeck, draw, shuffle } from "./deck.mjs";
import db from "../../config/db.mjs";
import CARDS from "../../resources/cardslist.mjs";
import { ObjectId } from "mongodb";

export const californiaSpeed = express.Router();

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

californiaSpeed.get('/california/new', async (req, res) => {
    let result = await startNewGame();
    res.send(result).status(200);
});

californiaSpeed.get('/california/:gameID', async (req, res) => {
    let result = await getGameState(req.params.gameID);
    res.send(result).status(200);
});

californiaSpeed.patch('/california/:gameID/:pile/:player', async (req, res) => {
    console.log("play card");
    console.log(req.params);
    let result = await playCard(req.params.gameID, req.params.pile, req.params.player);
    console.log(result);
    res.send(result).status(200);
});

californiaSpeed.patch('/california/:gameID/scoop', async (req, res) => {
    let result = await scoop(req.params.gameID);
    res.send(result).status(200);
});

californiaSpeed.get('/california/:gameID/shuffle', async (req, res) => {
    if(noValidPlay((await getGameState(req.params.gameID)).gameState))
    {
        let result = await scoop(req.params.gameID);
        res.send(result).status(200);
    } else {
        res.send("there is still a valid play").status(200);
    }
});

async function getInternalGameState(gameID)
{
    let query = { _id: new ObjectId(gameID) };
    let collection = await db.collection("Games");
    let gameState = await collection.findOne(query)
    gameState.validPlays = [...gameState.validPlays, ...(validPlays(gameState))];

    return Promise.resolve(gameState);
}
// ----------------------------------------------
// return game state data from the database
async function getGameState(gameID)
{
    let gameState = await getInternalGameState(gameID);
    let winner = 0;
    if(gameState.player1deck.length === 0)
    {
        winner = 1;
    }
    else if(gameState.player2deck.length === 0)
    {
        winner = 2;
    }
    let result =
    {
        _id: gameState._id,
        player1deck: gameState.player1deck.length,
        player2deck: gameState.player2deck.length,
        pile1: gameState.pile1.at(-1),
        pile2: gameState.pile2.at(-1),
        pile3: gameState.pile3.at(-1),
        pile4: gameState.pile4.at(-1),
        pile5: gameState.pile5.at(-1),
        pile6: gameState.pile6.at(-1),
        pile7: gameState.pile7.at(-1),
        pile8: gameState.pile8.at(-1),
        validPlays: gameState.validPlays,
        winner: winner
    }
    return Promise.resolve(result);

}

// ----------------------------------------------
// Start a new game
export async function startNewGame()
{
    let deck = await createDeck();
    let player1deck = new Array();
    let player2deck = new Array();
    player1deck = await draw(deck, 26);
    player2deck = await draw(deck, 26);
    let gameState = await reDeal(player1deck, player2deck); // deal out the 8 piles
    let collection = db.collection("Games");
    let result = 
    {   "gameID": (await collection.insertOne(gameState)).insertedId,
        gameState: gameState
    }
    return Promise.resolve(result);
}

function validPlays(gameState)
{
    let validPlays = new Array();
    for(let i = 1; i < 9; i++)
    {
        if(validPlay(i, gameState))
        {
            validPlays.push(i);
        }
    }
    return validPlays;
}
// ----------------------------------------------
// valid play
function validPlay(pile, gameState)
{
    // keep track of valid plays
    let card = gameState["pile" + pile].at(-1);
    let valid = false;
    for(let i = 1; i < 9; i++)
    {
        if(i == pile)
        {
            continue;
        }
        let other_card = gameState["pile" + i].at(-1);
        if(card.rank === other_card.rank)
        {
            valid = true;
        }
    }
    return valid;
}

async function playCard(gameID, pile, player)
{
    console.log("play card")
    console.log(pile + " " + player)
    let gameState = await getInternalGameState(gameID);
    console.log(gameState);
    pile = parseInt(pile);
    console.log(gameState.validPlays);
    console.log(gameState.validPlays.includes(pile));
    if(gameState.validPlays.includes(pile) || validPlay(pile, gameState))
    {
        gameState.validPlays = gameState.validPlays.filter(e => e !== pile);
    }else
    {
        return Promise.resolve("invalid play");
    }
    let card;
    if(player === "1")
    {
        card = gameState.player1deck.pop();
        console.log("player1 card: " + card);
        if(gameState.player1deck.length === 0)
        {
            win(player);
        }

    }
    else if(player === "2")
    {
        card = gameState.player2deck.pop();
        console.log("player2 card: " + card);
        if(gameState.player2deck.length === 0)
        {
            win(player);
        }
        
    }

    gameState["pile" + pile].push(card);
    let collection = db.collection("Games");
    let result = await collection.updateOne({_id: new ObjectId(gameID)}, {$set: gameState}); 
    gameState =
    {
        "gameID": gameID,
        "gameState": gameState
    }
    return gameState;
}

// ----------------------------------------------
// scoop up the 4 piles into the player's deck, shuffle, and redeal
async function scoop(gameID)
{
    let gameState = (await getInternalGameState(gameID));
    let player1deck = gameState.player1deck;
    let player2deck = gameState.player2deck;

    // for(let i = 0; i < 5; i++)
    // {
    //     for(let cards in gameState["pile" + (i * 2 + 2)])//even piles are player2
    //     {
    //         player2deck.push(gameState["pile" + (i * 2 + 2)][cards]);
    //     }
    //     for(let cards in gameState["pile" + (i * 2 + 1)])//odd piles are player1
    //     {
    //         player1deck.push(gameState["pile" + (i * 2 + 1)][cards]);
    //     }
    // }
    player1deck.push(...gameState.pile5);
    player1deck.push(...gameState.pile6);
    player1deck.push(...gameState.pile7);
    player1deck.push(...gameState.pile8);
    player2deck.push(...gameState.pile1);
    player2deck.push(...gameState.pile2);
    player2deck.push(...gameState.pile3);
    player2deck.push(...gameState.pile4);

    let collection = db.collection("Games");
    shuffle(gameState.player1deck);
    shuffle(gameState.player2deck);
    gameState = await reDeal(gameState.player1deck, gameState.player2deck);
    let result = collection.updateOne({_id: new ObjectId(gameID)}, {$set: gameState}); // NO AWAIT HERE BECAUSE WE WANT SPEEEEEEED
    gameState =
    {
        "gameID": gameID,
        "gameState": gameState
    }
    return gameState;
}

// ----------------------------------------------
// deal out the 8 piles
async function reDeal(cardsPlayer1, cardsPlayer2)
{
    let decks = {// odd piles are player1, even piles are player2
        "player1deck": cardsPlayer1.slice(4),
        "player2deck": cardsPlayer2.slice(4),
        "pile1": [cardsPlayer1[0]],
        "pile2": [cardsPlayer2[0]],
        "pile3": [cardsPlayer1[1]],
        "pile4": [cardsPlayer2[1]],
        "pile5": [cardsPlayer1[2]],
        "pile6": [cardsPlayer2[2]],
        "pile7": [cardsPlayer1[3]],
        "pile8": [cardsPlayer2[3]],
        "validPlays": []
    }
    return Promise.resolve(decks);
}




function win(player)
{
    console.log(player + " wins");
}
