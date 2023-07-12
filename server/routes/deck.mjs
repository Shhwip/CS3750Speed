
// ----------------------------------------------
// Make new shuffled deck of cards
// parameters: none
// returns the following object:
// {
//   "success": true,
//   "deck_id": "3p40paa87x90",
//   "remaining": 52
// }

// ----------------------------------------------
// Draw cards from deck or pile
// parameters: deck_id, count
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
//   "deck_id": "3p40paa87x90",
//   "remaining": 50
// }

// ----------------------------------------------
// Create pile
// parameters: deck_id/pile_id, pile_name, number_of_cards
// CreatePile(3p40paa87x90, discard_1, 20)
// returns the following object:
// {
//   "success": true,
//   "pile_name": "discard_1",
//   "pile_id": "3p40paa87x90_discard_1",
//   "remaining": 20
// }

// ----------------------------------------------
// Add cards to pile
// parameters: pile_id, array of cards
// AddToPile(3p40paa87x90_discard_1, [2, 3])
// returns the following object:
// {
//   "success": true,
//   "pile_id": "3p40paa87x90_discard_1",
//   "remaining": 22
// }

// ----------------------------------------------
// Combine and shuffle piles
// parameters: array of piles, pile_name
// CombinePiles([3p40paa87x90_discard_1, 3p40paa87x90_discard_2], discard_3)
// returns the following object:
// {
//   "success": true,
//   "remaining": 42
//   "pile_id": "3p40paa87x90_discard_3",
// }