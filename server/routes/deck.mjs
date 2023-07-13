import express from 'express';
import db from "../config/db.mjs";
import CARDS from "../resources/cardslist.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();


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

// ----------------------------------------------
// Make new shuffled deck of cards
// url: /deck/new
// request body: none
// returns the following object:
//{
//    "acknowledged": true,
//    "insertedId": "64af4ef4a688f1539bebb87d"
//}
router.get('/deck/new', async (req, res) => {
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
    res.send(result).status(204);
});



// ----------------------------------------------
// Draw cards from deck or pile
// url: /{pile_id}/{number_of_cards_to_draw}
// request body: none
// Draw(3p40paa87x90, 2)
// returns the following object:
// {
//   "success": true,
//   "cards": [
//     {
//       "card": "2",
//       "rank": "1",
//       "reference": "2_of_clubs",
//      },
//     {
//       "card": "15",
//       "rank": "2",
//       "reference": "3_of_diamonds",
//     }
//   ],
//   "pile_id": "3p40paa87x90",
//   "remaining": 50
// }
router.patch('/draw/:pile_id/:number', async (req, res) => {
    //TODO: do not allow to draw more cards than there are left.
    let query = {_id: new ObjectId(req.params.pile_id)};
    let number = parseInt(req.params.number);

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
        let card_id = (deck.list[i]);
        let card_rank = (card_id % 13) + 1;
        let reference = CARDS.cards[card_id - 1]
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
    
    const result = 
    {
        success: updateResult,
        cards: cards_list,
        pile_id: req.params.pile_id,
        remaining: deck.list.length - new_index
    }
    res.send(result).status(200);
});


// ----------------------------------------------
// Create pile
// url: /new_pile/{id of original pile}/
// request body: {
//                  pile_name: "name of the new pile"
//                  number_of_cards: "number of cards the new pile has"
//                 }
// CreatePile(3p40paa87x90, discard_1, 20)
// returns the following object:
// {
//   "success": true,
//   "pile_name": "discard_1",
//   "pile_id": "3p40paa87x90_discard_1",
//   "remaining": 20
// }
router.post('/new_pile/:pile_id/', async (req, res) => {
    let query = {_id: new ObjectId(req.params.pile_id)};
    let pile_name = req.body.pile_name;
    let number = req.body.number_of_cards;

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
        cards_list.push(deck.list[i]);
    }
    let new_pile = {
        _id: new ObjectId(req.params.pile_id + pile_name),
        card_list: cards_list,
        index: 0
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
    res.send(result).status(200);
});

// ----------------------------------------------
// Add cards to pile
// url: /add/{pile id}
// request body: cards: array of cards
// AddToPile(3p40paa87x90_discard_1)
// returns the following object:
// {
//   "success": true,
//   "pile_id": "3p40paa87x90_discard_1",
//   "remaining": 22
// }
router.post('/add/:pile_id', async (req, res) => {
    let collection = await db.collection("decks");
    let query = {_id: new ObjectId(req.params.pile_id)};
    let result = await collection.updateOne(query, {$push: {card_list: {each: req.body.cards}}});
    res.send(result).status(200);
});

// ----------------------------------------------
// Combine and shuffle piles
// url: /combine/{final pile id}
// request body: piles: array of pile id's
// CombinePiles([3p40paa87x90_discard_1, 3p40paa87x90_discard_2], 3p40paa87x90_discard_3)
// returns the following object:
// {
//   "success": true,
//   "remaining": 42
//   "pile_id": "3p40paa87x90_discard_3",
// }
router.post('/combine/:pile_id', async (req, res) => {
    let collection = await db.collection("decks");
    let piles = req.body.piles;
    let final_pile = new Array();
    for(let i = 0; i < piles.length; i++)
    {
        for(let j = piles[i].index; j < piles[i].card_list.length; j++)
        {
            final_pile.push(piles[i].card_list[j]);
        }
        let deleteQuery = {_id: new ObjectId(piles[i]._id)};
        let deleteResult = await collection.deleteOne(deleteQuery);
    }
    shuffle(final_pile);
    query = {_id: new ObjectId(req.params.pile_id)};
    let result = await collection.insertOne(query, {$set: {card_list: final_pile, index: 0}});
    finalResult = {
        success: result,
        remaining: final_pile.length,
        pile_id: req.params.pile_id
    }
    res.send(result).status(200);
});

// ----------------------------------------------
// Delete pile
// url: /delete/{pile id}
// request body: none
// DeletePile(3p40paa87x90_discard_1)
// returns the following object:
// {
//   "success": true,
// }
router.delete('/delete/:pile_id', async (req, res) => {
    let collection = await db.collection("decks");
    let query = {_id: new ObjectId(req.params.pile_id)};
    let result = await collection.deleteOne(query);
    res.send(result).status(200);
});

export default router;