import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import RegisterForm from "./pages/register";
import LobbyPage from "./pages/lobby";
import socket from "./socket";
// add for sockets, run npm install socket.io-client
// import io from "socket.io-client";

// const socket = io.connect("http://localhost:5050");
import GamePage from "./pages/game";
import RoutesWithUserChatComponent from "./components/RoutesWithChatComponent";
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
          <Route path="/lobby" element={<LobbyPage socket={socket} />} />
          <Route element={<RoutesWithUserChatComponent/>}>
            <Route path="/game" element={<GamePage />} />
            <Route path="/game/california" element={<CaliforniaPage />} />
          </Route>
         
        </Routes>
    </>
  );
}

export default App;
