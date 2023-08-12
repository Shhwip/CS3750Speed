import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import RegisterForm from "./pages/register";
import LobbyPage from "./pages/lobby";
import { useState, useEffect, useCallback } from "react";
// import navbar
import Navbar from "./components/navbar";

import GamePage from "./pages/game";
import CaliforniaPage from "./pages/california";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Classic from "./pages/classic";
import WaitingRoomPage from "./pages/waitingRoom";
import Logout from "./pages/logout";
import Highscore from "./components/highScore";



function App() {
  const [isAuth, setAuthentiation] = useState(false);
  const [userSession, setUserSession] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserAuth = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:5050/api/authentication/isAuth", {
        credentials: "include",
      });
      
      if (!res.ok) {
        setAuthentiation(false);
        return;
      }

      const data = await res.json();
      setUserSession(data);
      setAuthentiation(true);
    } catch (error) {
      setAuthentiation(false);
    } finally {
      setIsLoading(false);
    }
  }, []); 

  useEffect(() => {
    fetchUserAuth();
  }, [fetchUserAuth])
 
  return (
    <>
      {/* Added Navbar to app page */}
      <Navbar isAuth={isAuth} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage setAuthentiation={setAuthentiation} onLoginSuccess={fetchUserAuth} />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route element={<ProtectedRoute isAuth={isAuth} isLoading = {isLoading} userName = {userSession.userName} />}>
          <Route path="/game" element={<GamePage />} />
          <Route path="/game/california" element={<CaliforniaPage />} />
          <Route path="/lobby" element={<LobbyPage  userName = {userSession.userName}/>} />
          <Route path="/waitingroom/:id" element={<WaitingRoomPage />}/>
          <Route path="/logout" element={<Logout setAuthentiation={setAuthentiation}/>}/>
          <Route path="/highscore" element={<Highscore/>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
