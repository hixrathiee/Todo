import { useEffect, useState } from "react";
import { getBoards, createBoard, deleteBoard } from "../services/api";
import Board from "./Board";
import {
  FiPlus,
  FiLogOut,
  FiFolder,
  FiTrash2,
} from "react-icons/fi";

const Dashboard = ({ onLogout }) => {
  const [boards, setBoards] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [showInput, setShowInput] = useState(false);
  const [boardTitle, setBoardTitle] = useState("");

  useEffect(() => {
    getBoards().then(setBoards);
  }, []);

  if (selectedBoard) {
    return (
      <Board
        board={selectedBoard}
        goBack={() => setSelectedBoard(null)}
      />
    );
  }

  const addBoard = async () => {
    if (!boardTitle.trim()) return;

    const board = await createBoard(boardTitle);
    setBoards((prev) => [...prev, board]);
    setBoardTitle("");
    setShowInput(false);
  };

  const handleDeleteBoard = async (e, boardId) => {
    e.stopPropagation(); 

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this board?"
    );
    if (!confirmDelete) return;

    await deleteBoard(boardId);
    setBoards((prev) => prev.filter((b) => b._id !== boardId));
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-100 to-gray-200 px-4 py-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Your Boards
          </h2>

          <div className="flex gap-3">
            <button
              onClick={() => setShowInput(true)}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
            >
              <FiPlus /> New Board
            </button>

            {onLogout && (
              <button
                onClick={onLogout}
                className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                <FiLogOut /> Logout
              </button>
            )}
          </div>
        </div>

        {/* Add Board Input */}
        {showInput && (
          <div className="flex gap-3 mb-6">
            <input
              value={boardTitle}
              onChange={(e) => setBoardTitle(e.target.value)}
              placeholder="Enter board name"
              className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              onClick={addBoard}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              Add
            </button>
            <button
              onClick={() => {
                setShowInput(false);
                setBoardTitle("");
              }}
              className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        )}

        {/* Empty State */}
        {boards.length === 0 ? (
          <div className="text-center text-gray-500 mt-20">
            <p className="text-lg">No boards yet</p>
            <p className="text-sm mt-2">
              Click <span className="font-semibold">New Board</span> to
              get started
            </p>
          </div>
        ) : (
          /* Boards Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {boards.map((b) => (
              <div
                key={b._id}
                onClick={() => setSelectedBoard(b)}
                className="relative bg-white rounded-xl shadow-md p-6 cursor-pointer
                           hover:shadow-lg hover:-translate-y-1 transition-all"
              >
                {/* Delete Icon */}
                <button
                  onClick={(e) => handleDeleteBoard(e, b._id)}
                  className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
                  title="Delete board"
                >
                  <FiTrash2 />
                </button>

                <div className="flex items-center gap-3 mb-2">
                  <FiFolder className="text-blue-600 text-xl" />
                  <h3 className="text-lg font-semibold text-gray-800">
                    {b.title}
                  </h3>
                </div>
                <p className="text-sm text-gray-500">
                  Click to view tasks
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
