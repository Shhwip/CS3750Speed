import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import RegisterForm from "./pages/register";
import LobbyPage from "./pages/lobby";
import { useState, useEffect } from "react";

import GamePage from "./pages/game";
import CaliforniaPage from "./pages/california";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Classic from "./pages/classic";
import WaitingRoomPage from "./pages/waitingRoom";



function App() {
  const [isAuth, setAuthentiation] = useState(false);
  const [userSession, setUserSession] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchUserAuth = async () => {
      try {
        const res = await fetch("http://localhost:5050/api/authentication/isAuth", {
          credentials: "include",
        });
        if (!res.ok) return setAuthentiation(false);

        setUserSession(await res.json());
        setAuthentiation(true);
      } catch (error) {
        setAuthentiation(false);
        console.error("There was an error fetch auth", error);
        return;
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserAuth();
  }, []);
 
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage setAuthentiation={setAuthentiation} />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route element={<ProtectedRoute isAuth={isAuth} isLoading = {isLoading} userName = {userSession.userName} />}>
          <Route path="/game" element={<GamePage />} />
          <Route path="/game/california" element={<CaliforniaPage />} />
          <Route path="/lobby" element={<LobbyPage  userName = {userSession.userName}/>} />
          <Route path="/classic" element={<Classic />}/>
          <Route path="/waitingroom/:id" element={<WaitingRoomPage />}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;
