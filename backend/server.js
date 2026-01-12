import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import boardRouter from './routes/board.routes.js';
import todoRouter from './routes/todo.routes.js';
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

//DB
connectDB()
const PORT = process.env.PORT || 5000;

// Routes
app.use("/api/boards", boardRouter);
app.use("/api/todos", todoRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});