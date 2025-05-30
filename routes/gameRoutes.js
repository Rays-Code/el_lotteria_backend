import express from 'express';
import { getGameState, startGame, drawNextNumber, stopGame } from '../controllers/gameController.js';

export const gameRouter = express.Router();

gameRouter.post('/start', startGame);
gameRouter.post('/stop', stopGame);
gameRouter.post('/draw', drawNextNumber);
gameRouter.get('/state', getGameState);