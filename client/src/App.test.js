// import { render, screen } from '@testing-library/react';
// const request = require('supertest');
// import App from './App';

// const url = 'http://3.89.204.193:5050';
// let deck_id = '';
// let pile_id1 = '';
// let pile_id2 = '';
// let cards_list = new Array();


// describe('get a new deck', () => {
//   test('should return a new deck id', async() => {
//     const response = await request(url).get('/deck/new');
//     deck_id = response.body.insertedId;
//     expect(deck_id).not.toBe('');
//     expect(deck_id.length).toBe(24);
//     expect(response.statusCode).toBe(200);
//   });
// });

// describe('draw a card', () => {
//   test('should return a card', async() => {
//     const response = await request(url).patch('/draw/' + deck_id + '/1');
//     cards_list.push(response.body.cards[0]);
//     expect(response.body.cards.length).toBe(1);
//     expect(response.body.remaining).toBe(51);
//     expect(response.statusCode).toBe(200);
//   });
// });

// describe('create pile from deck', () => {
//   test('should return a pile', async() => {
//     const response = await request(url).post('/new_pile/' + deck_id + '/')
//     .send({pile_name: "discard_1", number_of_cards: 20})
//     .set('Content-Type', 'application/json')
//     .set('Accept', 'application/json');
//     pile_id1 = response.body.new_pile._id;
//     expect(response.body.new_pile.pile_name).toBe("discard_1");
//     expect(response.body.new_pile.pile_id).toBe(deck_id + "_discard_1");
//     expect(response.body.new_pile.remaining).toBe(20);
//     expect(response.body.new_pile.index).toBe(0);
//     expect(response.statusCode).toBe(200);
//   });
// });

// describe('draw a card from pile', () => {
//   test('should return a card', async() => {
//     const response = await request(url).patch('/draw/' + pile_id1 + '/1');
//     cards_list.push(response.body.cards[0]);
//     expect(response.body.cards.length).toBe(1);
//     expect(response.body.remaining).toBe(19);
//     expect(response.statusCode).toBe(200);
//   });
// });

// describe('create pile from pile', () => {
//   test('should return a pile', async() => {
//     const response = await request(url).post('/new_pile/' + pile_id1 + '/')
//     .send({pile_name: "discard_2", number_of_cards: 10})
//     .set('Content-Type', 'application/json')
//     .set('Accept', 'application/json');
//     pile_id2 = response.body.new_pile._id;
//     expect(response.body.new_pile.pile_name).toBe("discard_2");
//     expect(response.body.new_pile.pile_id).toBe(pile_id1 + "_discard_2");
//     expect(response.body.new_pile.remaining).toBe(10);
//     expect(response.body.new_pile.index).toBe(0);
//     expect(response.statusCode).toBe(200);
//   });
// });

// describe('combine piles', () => {
//   test('should return a pile', async() => {
//     const response = await request(url).post('/combine/' + deck_id + '/')
//     .send({piles: [deck_id, pile_id1, pile_id2]})
//     .set('Content-Type', 'application/json')
//     .set('Accept', 'application/json');
//     expect(response.body.remaining).toBe(50);
//     expect(response.statusCode).toBe(200);
//   });
// });

// describe('add cards to pile', () => {
//   test('should return a pile', async() => {
//     let cardInts = new Array();
//     for(let i = 0; i < cards_list.length; i++)
//     {
//       cardInts.push(cards_list[i].card);
//     }
//     const response = await request(url).post('/add/' + deck_id + '/')
//     .send({cards: cardInts})
//     .set('Content-Type', 'application/json')
//     .set('Accept', 'application/json');
//     expect(response.body.modifiedCount).toBe(1);
//     expect(response.statusCode).toBe(200);
//   });
// });

// describe('Draw 52 unique cards', () => {
//   test('should return 52 unique cards', async() => {
//     const response = await request(url).patch('/draw/' + deck_id + '/52');
//     let cards_array = new Int16Array(52);
//     for(let i = 0; i < response.body.cards.length; i++)
//     {
//       cards_array[i] = (response.body.cards[i].card);
//     }
//     cards_array.sort();
//     let unique = true;
//     for(let i = 0; i < cards_array.length - 1; i++)
//     {
//       if(cards_array[i] + 1 != cards_array[i + 1])
//       {
//         expect(cards_array[i] + 1).toBe(cards_array[i + 1]);
//         unique = false;
//       }
//     }
//     expect(unique).toBe(true);
//     expect(response.body.cards.length).toBe(52);
//     expect(response.body.remaining).toBe(0);
//     expect(response.statusCode).toBe(200);
//   });
// });

// describe('delete piles', () => {
//   test('should delete all test piles', async() => {
//     const response = await request(url).delete('/delete/' + pile_id2 + '/');
//     expect(response.body.deletedCount).toBe(1);
//     expect(response.statusCode).toBe(200);
//     const response2 = await request(url).delete('/delete/' + pile_id1 + '/');
//     expect(response2.body.deletedCount).toBe(1);
//     expect(response2.statusCode).toBe(200);
//     const response3 = await request(url).delete('/delete/' + deck_id + '/');
//     expect(response3.body.deletedCount).toBe(1);
//     expect(response3.statusCode).toBe(200);
//   });
// });
