import express from "express";
import { createBoard, deleteBoard, getBoards } from "../controllers/board.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const boardRouter = express.Router();

boardRouter.post("/",authMiddleware, createBoard);
boardRouter.get("/",authMiddleware, getBoards);
boardRouter.delete("/:id",authMiddleware, deleteBoard);

boardRouter.get("/test", (req, res) => {
  res.json({ message: "board routes working" });
});

export default boardRouter;