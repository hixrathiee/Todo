import { useState } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

function App() {
  const [loggedIn, setLoggedIn] = useState(
    Boolean(localStorage.getItem("token"))
  );
  const [showSignup, setShowSignup] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
  };

  if (!loggedIn) {
    return showSignup ? (
      <Signup
        onSignup={() => setLoggedIn(true)}
        switchToLogin={() => setShowSignup(false)}
      />
    ) : (
      <Login
        onLogin={() => setLoggedIn(true)}
        switchToSignup={() => setShowSignup(true)}
      />
    );
  }

  return <Dashboard onLogout={logout} />;
}

export default App;
