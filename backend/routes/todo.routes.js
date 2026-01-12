import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { createTodo, deleteTodo, getTodosByBoard, updateTodo } from "../controllers/todo.controller.js";

const todoRouter = express.Router();

// Public test route
todoRouter.get("/test", (req, res) => {
  res.json({ message: "Todo routes working" });
});


todoRouter.post("/", authMiddleware, createTodo);
todoRouter.get("/:boardId", authMiddleware, getTodosByBoard);
todoRouter.put("/:id", authMiddleware, updateTodo);
todoRouter.delete("/:id", authMiddleware, deleteTodo);

export default todoRouter;
