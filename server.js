import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { gameRouter } from './routes/gameRoutes.js';
import { connectDB } from './config/db.js';
import { initGameWatch } from './changeStreams/gameWatcher.js';

const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());

await connectDB();
await initGameWatch();


app.use('/api/game', gameRouter)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));