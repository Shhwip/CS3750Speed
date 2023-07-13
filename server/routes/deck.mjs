import express from 'express';
import db from "../config/db.mjs"
import CARDS from "../resources/cardslist.mjs"

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
        list : decklist,
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
    let query = {_id: new ObjectId(req.params.pile_id)};
    let number = req.params.number;

    let collection = await db.collection("decks");
    let deck = await collection.findOne(query);
    if(!deck)
    {
        res.send("pile not found").status(404);
    }
    let cards_list = new Array();
    for(let i = deck.index; i < number + deck.index; i++)
    {
        cards_list.push(deck.list[i]);
    }

    res.send(cards_list).status(200);
});


// ----------------------------------------------
// Create pile
// url: /new_pile/{id of original pile}/{new pile name}/{number of cards}
// request body: none
// CreatePile(3p40paa87x90, discard_1, 20)
// returns the following object:
// {
//   "success": true,
//   "pile_name": "discard_1",
//   "pile_id": "3p40paa87x90_discard_1",
//   "remaining": 20
// }
router.get('/new_pile/:pile_id/:new_pile_name/:number', async (req, res) => {


});

// ----------------------------------------------
// Add cards to pile
// url: /add/{pile id}
// request body: array of cards
// AddToPile(3p40paa87x90_discard_1, 2)
// returns the following object:
// {
//   "success": true,
//   "pile_id": "3p40paa87x90_discard_1",
//   "remaining": 22
// }
router.post('/add/:pile_id', async (req, res) => {


});

// ----------------------------------------------
// Combine and shuffle piles
// url: /combine/{final pile id}
// request body: array of pile id's
// CombinePiles([3p40paa87x90_discard_1, 3p40paa87x90_discard_2], discard_3)
// returns the following object:
// {
//   "success": true,
//   "remaining": 42
//   "pile_id": "3p40paa87x90_discard_3",
// }
router.post('/combine/:pile_id', async (req, res) => {


});

export default router;