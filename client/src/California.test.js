const request = require('supertest');
import App from './App';

const url = 'http://3.89.204.193:5050';
var gameID = null;
var gameState = null;

describe('get test game state', () => {
    test('should return a game state', async() => {
        const response = await request(url).get('/game/california/test')
        .send({"userType": "player1"})
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');
        expect(response.body.gameState.player1deck.card).toBe(1);
        expect(response.body.gameState.player1deck.rank).toBe(2);
        expect(response.body.gameState.player1deck.reference).toBe("2_of_clubs");
        expect(response.body.gameState.player2deck).toBe(null);
        
        const response2 = await request(url).get('/game/california/test')
        .send({userType: "player2"})
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');
        expect(response2.body.gameState.player1deck).toBe(null);
        expect(response2.body.gameState.player2deck.card).toBe(2);
        expect(response2.body.gameState.player2deck.rank).toBe(3);
        expect(response2.body.gameState.player2deck.reference).toBe("3_of_clubs");
    });
});

describe('get a new game', () => {
    test('should return a new game and gameID', async() => {
        const response = await request(url).get('/game/california/new');
        expect(response.body.gameID).not.toBe(null);
        gameID = response.body.gameID;
        console.log(gameID);
        expect(response.body.gameState).not.toBe(null);
        gameState = response.body.gameState;
    });
});

describe('get a gamestate', () => {
    test('game state should match the previous test', async() => {
        const response = await request(url).get('/game/california/' + gameID);
        expect(response.body.gameState).toEqual(gameState);
    });
});

describe('player 1 plays a card', () => {
    test('should return a new game state', async() => {
        const response = await request(url).patch('/game/california/' + gameID + '/2/player1');
        expect(response.body.gameState.pile2[-1]).toBe(gameState.player1deck[-1]);
        expect(response.body.gameState.player1deck).toEqual(gameState.player1deck.slice(0, -1));
    });
});

describe('player 2 plays a card', () => {
    test('should return a new game state', async() => {
        const response = await request(url).patch('/game/california/' + gameID + '/3/player2');
        expect(response.body.gameState.pile3[-1]).toBe(gameState.player2deck[-1]);
        expect(response.body.gameState.player2deck).toEqual(gameState.player2deck.slice(0, -1));
    });
});

describe('SCOOP', () => {   
    test('should return a new game state', async() => {
        const response = await request(url).patch('/game/california/' + gameID + '/scoop');
        expect(response.body.gameState.player1deck.length + response.body.gameState.player2deck.length).toEqual(44);
        expect(response.body.gameState.pile2.length).toEqual(1);
    });
});