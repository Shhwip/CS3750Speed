const request = require('supertest');
import App from './App';

const url = 'http://localhost:5050';

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
