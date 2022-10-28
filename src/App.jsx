import "./App.css";
import React, { useState } from "react";
import Login from "./components/loginForm/Login.jsx";
import Register from "./components/registerForm/Register.jsx";
function App() {
  const [currentForm, setCurrentForm] = useState('register');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (
    <div className="App">
      {
        currentForm === "register" ? <Register onFormSwitch={toggleForm} /> : <Login onFormSwitch={toggleForm} />
      }
    </div>
  );
}

export default App;
