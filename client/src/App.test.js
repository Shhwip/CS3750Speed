import { render, screen } from '@testing-library/react';
const request = require('supertest');
import App from './App';

const url = 'http://localhost:5050';
let deck_id = '';


describe('get a new deck', () => {
  test('should return a new deck id', async() => {
    const response = await request(url).get('/deck/new');
    deck_id = response.body.insertedId;
    console.log(deck_id);
    expect(deck_id).not.toBe('');
    expect(deck_id.length).toBe(24);
    expect(response.statusCode).toBe(200);
  });
});

describe('draw a card', () => {
  test('should return a card', async() => {
    const response = await request(url).patch('/draw/' + deck_id + '/1');
    expect(response.body.cards.length).toBe(1);
    expect(response.body.remaining).toBe(51);
    expect(response.statusCode).toBe(200);
  });
});

describe('create pile from deck', () => {
  test('should return a pile', async() => {
    const response = await request(url).post('/new_pile/' + deck_id + '/')
    .send({pile_name: "discard_1", number_of_cards: 20})
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json');
    expect(response.body.new_pile.pile_name).toBe("discard_1");
    expect(response.body.new_pile.pile_id).toBe(deck_id + "_discard_1");
    expect(response.body.new_pile.remaining).toBe(20);
    expect(response.body.new_pile.index).toBe(0);
    expect(response.statusCode).toBe(200);
  });
});

