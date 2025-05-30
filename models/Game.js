import mongoose from 'mongoose';

const gameSchema = mongoose.Schema({
    user1: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    user2: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    numbersDrawn: {type: [Number], default: []},
    winner: {type: String, default: null},
})

export const Game = mongoose.model('Game', gameSchema);