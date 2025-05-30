import { Game } from '../models/Game.js';

export const initGameWatch = async () => {
    try {
        const changeStream = Game.watch();


        changeStream.on('change', async (change) => {

            if (change.operationType !== 'update') return;

            const gameId = change.documentKey._id;
            const game = await Game.findById(gameId).populate('user1 user2');

            if (!game) {
                return;
            }

            console.log(`Game ${gameId} loaded. Drawn numbers:`, game.numbersDrawn);

            if (game.winner) {
                return;
            }

            const checkWinner = (user, username) => {
                if (!user?.grid || user.grid.length < 9) {
                    return false;
                }

                const cut = new Set(game.numbersDrawn.map(Number));
                const grid = user.grid.map(Number);

                // Checking rows
                for (let i = 0; i < 3; i++) {
                    const row = grid.slice(i * 3, i * 3 + 3);
                    if (row.every(n => cut.has(n))) return true;
                }

                // Checking columns
                for (let i = 0; i < 3; i++) {
                    const col = [grid[i], grid[i + 3], grid[i + 6]];
                    if (col.every(n => cut.has(n))) return true;
                }

                return false;
            };

            let winnerFound = false;

            if (checkWinner(game.user1, 'User 1')) {
                game.winner = 'User 1';
                winnerFound = true;
            } else if (checkWinner(game.user2, 'User 2')) {
                game.winner = 'User 2';
                winnerFound = true;
            }

            if (winnerFound) {
                await game.save();
            }
        });

        changeStream.on('error', (err) => {
            console.error('Error in change stream:', err);
        });

    } catch (err) {
        console.error('Failed to initialize game watcher:', err);
    }
};
