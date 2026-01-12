import Board from "../models/board.model.js"

// Create a new board
export const createBoard = async(req,res) =>{
    try{
     const {title} = req.body

     const board = new Board({
        title,
        userId: req.user.uuid,
     })

     res.status(201).json(board)
    }catch(error){
      res.status(500).json({ message: "Failed to create board" })
    }
}

// Get all boards for a user
export const getBoards = async(req,res) =>{
    try{
      const boards = await Board.find({ userId: req.user.uuid }).sort({ createdAt: -1 })    
        res.status(200).json(boards)    
    }catch(error){
      res.status(500).json({ message: "Failed to fetch boards" })
    }
}

// Delete a board by ID
export const deleteBoard = async (req, res) => {
  try {
    await Board.findByIdAndDelete(req.params.id);
    res.json({ message: "Board deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete board" });
  }
};