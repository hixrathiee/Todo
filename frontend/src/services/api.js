const API_URL = "http://localhost:5000/api";

const getHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const getBoards = async () => {
  const res = await fetch(`${API_URL}/boards`, {
    headers: getHeaders(),
  });
  return res.json();
};

export const createBoard = async (title) => {
  const res = await fetch(`${API_URL}/boards`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ title }),
  });
  return res.json();
};

export const deleteBoard = async (id) => {
  await fetch(`${API_URL}/boards/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
};

export const getTodos = async (boardId) => {
  const res = await fetch(`${API_URL}/todos/${boardId}`, {
    headers: getHeaders(),
  });
  return res.json();
};

export const createTodo = async (title, boardId) => {
  const res = await fetch(`${API_URL}/todos`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ title, boardId }),
  });
  return res.json();
};

export const updateTodo = async (id, data) => {
  const res = await fetch(`${API_URL}/todos/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteTodo = async (id) => {
  await fetch(`${API_URL}/todos/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
};
