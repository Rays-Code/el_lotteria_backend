import { User } from '../models/User.js';
import { Game } from '../models/Game.js';

let gameId = null;

export const startGame = async (req, res) => {
    const {user1Grid, user2Grid} = req.body;

    const allNumbers = [...user1Grid, ...user2Grid];

    // checking if the array allNumbers have 9 as length and all the values are >=1 and <=9
    const isValid = new Set(allNumbers).size === 9 && allNumbers.every(n => n >= 1 && n <= 9);
    if(!isValid) return res.status(400).json({ error: 'Invalid grid' });

    // clearing old users and games for simplicity
    await User.deleteMany();
    await Game.deleteMany(); 

    const user1 = await User.create({name: 'User 1', grid: user1Grid});
    const user2 = await User.create({name: 'User 2', grid: user2Grid});

    const game = await Game.create({user1: user1._id, user2: user2._id});
    gameId = game._id;

    res.status(200).json({message: 'Game started'});
}


export const stopGame = async (req, res) => {
    gameId = null;
    await User.deleteMany();
    await Game.deleteMany();

    res.status(200).json({message: 'Game stopped'});
}


export const drawNextNumber = async (req, res) => {
    try {
        const { number } = req.body;

        const game = await Game.findById(gameId);

        if (!game || game.numbersDrawn.includes(number)) {
            return res.status(400).json({ error: 'Invalid or duplicate number' });
        }

        
        const updatedGame = await Game.findByIdAndUpdate(
            gameId,
            { $push: { numbersDrawn: number } },
            { new: true }
        );

        // Updating cutNumbers for both users
        const users = await User.find({ _id: { $in: [updatedGame.user1, updatedGame.user2] } });

        await Promise.all(users.map(async (user) => {
            if (user.grid.includes(number) && !user.cutNumbers.includes(number)) {
                user.cutNumbers.push(number);
                await user.save();
            }
        }));

        return res.status(200).json({ message: 'Number drawn and players updated' });

    } catch (err) {
        console.error("Error drawing number:", err);
        return res.status(500).json({ error: 'Server error' });
    }
};




export const getGameState = async (req, res ) => {
    if(!gameId) return res.status(400).json({error: 'No game in progress..'});

    const game = await Game.findById(gameId).populate('user1 user2');

    res.json({
        numbersCut: game.numbersDrawn,
        winner: game.winner
    }) 
}