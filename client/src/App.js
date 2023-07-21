import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import RegisterForm from "./pages/register";
import LobbyPage from "./pages/lobby";
import GamePage from "./pages/game";
import CaliforniaPage from "./pages/california";

function DisplayData({ record }) {
  return <h1>Group Name: {record.groupName}</h1>;
}

function App() {
  return (
    <>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/lobby" element={<LobbyPage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/game/california" element={<CaliforniaPage />} />
        </Routes>
    </>
  );
}

export default App;
