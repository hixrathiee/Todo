#  To-Do Board Web App

A full-stack **task management web application** where users can create boards and manage to-do items within each board.  
The app supports secure authentication, clean UI, and full CRUD operations.

##  Features

###  Authentication
- Email & Password authentication using **Firebase**
- Secure access to user-specific data
- Logout support

###  Boards
- Create new boards
- View all boards created by the logged-in user
- Delete boards
- Each board acts as a container for todos

###  Todos
- Add todos inside a board
- Mark todos as completed
- Delete todos
- Todos persist across sessions

###  UI/UX
- Clean and responsive UI built with **Tailwind CSS**
- Icons using **react-icons**
- Empty states and confirmation prompts
- Mobile-friendly layout


##  Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Firebase Authentication
- react-icons

### Backend
- Node.js
- Express.js
- Firebase Admin SDK (for auth verification)

### Database
- MongoDB (with Mongoose)


## 🧱 Project Architecture

frontend/
├── src/
│ ├── pages/
│ │ ├── Login.jsx
│ │ ├── Signup.jsx
│ │ ├── Dashboard.jsx
│ │ └── Board.jsx
│ ├── services/
│ │ └── api.js
│ ├── firebase.js
│ └── App.jsx

backend/
├── controllers/
│ ├── board.controller.js
│ └── todo.controller.js
├── routes/
│ ├── board.routes.js
│ └── todo.routes.js
├── models/
│ ├── User.js
│ ├── Board.js
│ └── Todo.js
├── middleware/
│ └── auth.middleware.js
├── config/
│ ├── db.js
│ └── firebase.js
└── server.js


---

##  Authentication Flow

1. User signs up / logs in using Firebase Authentication
2. Firebase returns an **ID token**
3. Frontend sends token in `Authorization` header
4. Backend verifies token using Firebase Admin SDK
5. Protected APIs are accessed securely

---

##  Setup Instructions

### 1 Clone the repository
git clone https://github.com/hixrathiee/Todo.git
cd project-folder

2️ Backend Setup
cd backend
npm install


Create a .env file:
PORT=5000
MONGO_URI=your_mongodb_connection_string

run:
npm run dev

Frontend Setup
cd frontend
npm install
npm start
