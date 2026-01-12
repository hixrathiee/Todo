import { useEffect, useState } from "react";
import { getTodos, createTodo, deleteTodo, updateTodo } from "../services/api";
import {
  FiArrowLeft,
  FiPlus,
  FiTrash2,
  FiCheckSquare,
} from "react-icons/fi";

const Board = ({ board, goBack }) => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    getTodos(board._id).then(setTodos);
  }, [board]);

  const addTodo = async () => {
    if (!newTodo.trim()) return;

    const todo = await createTodo(newTodo, board._id);
    setTodos((prev) => [...prev, todo]);
    setNewTodo("");
  };

  const toggleTodo = async (todo) => {
    const updated = await updateTodo(todo._id, {
      completed: !todo.completed,
    });

    setTodos((prev) =>
      prev.map((t) => (t._id === todo._id ? updated : t))
    );
  };

  const removeTodo = async (id) => {
    await deleteTodo(id);
    setTodos((prev) => prev.filter((t) => t._id !== id));
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-100 to-gray-200 px-4 py-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={goBack}
            className="flex items-center gap-2 text-blue-600 hover:underline"
          >
            <FiArrowLeft />
            Back
          </button>

          <h2 className="text-2xl font-bold text-gray-800 truncate">
            {board.title}
          </h2>
        </div>

        {/* Add Todo */}
        <div className="flex gap-3 mb-6">
          <input
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addTodo}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <FiPlus />
            Add
          </button>
        </div>

        {/* Empty State */}
        {todos.length === 0 ? (
          <div className="text-center text-gray-500 py-16">
            <FiCheckSquare className="mx-auto text-4xl mb-3 text-gray-400" />
            <p className="text-lg font-medium">No tasks yet</p>
            <p className="text-sm mt-1">
              Add your first todo using the input above
            </p>
          </div>
        ) : (
          /* Todo List */
          <ul className="space-y-3">
            {todos.map((t) => (
              <li
                key={t._id}
                className="flex items-center justify-between bg-gray-50
                           border rounded-lg px-4 py-3 hover:shadow-sm transition"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={t.completed}
                    onChange={() => toggleTodo(t)}
                    className="w-4 h-4 accent-blue-600 cursor-pointer"
                  />
                  <span
                    className={`${
                      t.completed
                        ? "line-through text-gray-400"
                        : "text-gray-800"
                    }`}
                  >
                    {t.title}
                  </span>
                </div>

                <button
                  onClick={() => removeTodo(t._id)}
                  className="text-red-500 hover:text-red-700 transition"
                  title="Delete task"
                >
                  <FiTrash2 />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Board;
