import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { json } from 'body-parser';
import apiRoutes from './routes/api';

dotenv.config();

const app: Express = express();

// Middleware
app.use(cors());
app.use(json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/meanapp')
  .then(() => {
    console.log('MongoDB Connected');
  })
  .catch((err) => {
    console.error('MongoDB Connection Error:', err);
  });

// Routes
app.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'Welcome to MEAN Stack Application' });
});

// API Routes
app.use('/api', apiRoutes);

const PORT: number = parseInt(process.env.PORT || '3000', 10);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
