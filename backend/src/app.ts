import cors from 'cors';
import dotenv from "dotenv";
import bodyParser from "body-parser";
import express, { Express } from "express";

import ticketRoutes from './routes/ticket.routes';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import statusRoutes from './routes/status.routes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/tickets', ticketRoutes)
app.use('/auth', authRoutes)
app.use('/users', userRoutes)
app.use('/status', statusRoutes)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});