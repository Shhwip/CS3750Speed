import express from 'express';
import db from "../../config/db.mjs";
import CARDS from "../../resources/cardslist.mjs";
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
async function newGame() {
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

// ----------------------------------------------
// ----------------------------------------------
// ----------------------------------------------
// ----------------------------------------------
// ----------------------------------------------
// DECK FUNCTIONS 
// TODO: move to separate file
// TODO: delete unused functions
function shuffle(array) {
    let currentIndex = array.length
    let randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {

      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

async function createDeck()
{
    let decklist = new Array(52);
    for(let i = 0; i < 52; i++)
    {
        decklist[i] = i + 1;
    }
    shuffle(decklist);
    let deck = {
        card_list : decklist,
        index : 0
    }
    let collection = await db.collection("decks");
    let result = await collection.insertOne(deck);
    return Promise.resolve(result.insertedId);
}

async function draw(pile_id, numberToDraw)
{
    let query = {_id: new ObjectId(pile_id)};
    let number = parseInt(numberToDraw);

    let collection = await db.collection("decks");
    let deck = await collection.findOne(query);
    if(!deck)
    {
        res.send("pile not found").status(404);
    }
    let cards_list = new Array();
    let deck_index = deck.index;
    if(deck_index + number > deck.card_list.length)
    {
        number = deck.card_list.length - deck_index;
        //TODO: return 500 error?
    }

    for(let i = deck_index; i < number + deck_index; i++)
    {
        let card_id = (deck.card_list[i]);
        let card_rank = (card_id % 13) + 1;
        let reference = CARDS[card_id - 1];
        cards_list.push(
            {
                card: card_id,
                rank: card_rank,
                reference: reference
            }
        )
    }
    let new_index = deck_index + number
    let updateResult = await collection.updateOne(query, {$set: {index: new_index}});
    
    return Promise.resolve(cards_list);
}

async function createPile(pile_id, pile_name, number_of_cards)
{
let query = {_id: new ObjectId(pile_id)};
let number = number_of_cards;

let collection = await db.collection("decks");
let deck = await collection.findOne(query);
if(!deck)
{
    res.send("pile not found").status(404);
}
let cards_list = new Array();
let deck_index = deck.index;
for(let i = deck_index; i < number + deck_index; i++)
{
    cards_list.push(deck.card_list[i]);
}
let new_pile = {
    pile_name: pile_name,
    pile_id: req.params.pile_id + "_" + pile_name,
    card_list: cards_list,
    index: 0,
    remaining: cards_list.length
}
let new_index = deck_index + number;
//TODO: return more 404's and 500's
let updateResult = await collection.updateOne(query, {$set: {index: new_index}});
let createResult = await collection.insertOne(new_pile);
let result = {
    update: updateResult,
    create: createResult,
    new_pile: new_pile
}
return Promise.resolve(result);
}

async function AddToPile(pile_id, cards)
{
    let collection = await db.collection("decks");
    let query = {_id: new ObjectId(pile_id)};
    let result = await collection.updateOne(query, {$push: {card_list: {$each: cards}}});
    return Promise.resolve(result);
}

async function CombinePiles(pile_id, piles)
{
    let collection = await db.collection("decks");
    //let piles = new Array();
    for(let i = 0; i < piles; i++)
    {
        piles.push(new ObjectId(piles[i]));
    }
    let query = {_id: {$in: piles}};
    const cursor = collection.find(query);
    let final_pile = new Array();
    for await(const doc of cursor)
    {
        for(let j = doc.index; j < doc.card_list.length; j++)
        {
            final_pile.push(doc.card_list[j]);
        }
    }
    shuffle(final_pile);
    query = {_id: new ObjectId(pile_id)};
    let result = await collection.updateOne(query, {$set: {card_list: final_pile, index: 0}});
    let finalResult = {
        success: result,
        remaining: final_pile.length,
        pile_id: pile_id
    };
    return Promise.resolve(finalResult);
}

async function DeletePile(pile_id)
{
    let collection = await db.collection("decks");
    let query = {_id: new ObjectId(pile_id)};
    let result = await collection.deleteOne(query);
    return Promise.resolve(result);
}

export default classicSpeed;