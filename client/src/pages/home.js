import React from "react";

const HomePage = () => {
  return <div>
    {/* General navbar for registration/login */}
    <nav class="navbar navbar-dark bg-dark navbar-expand-lg justify-content-between">
      <a class="navbar-brand" href="/">Group Out of Town - Speed Home</a>

      <div class="collapse navbar-collapse justify-content-end">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="/register">Register</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/login">Login</a>
          </li>
          {/* Lobby link won't be here for final product */}
          <li class="nav-item">
            <a class="nav-link" href="/lobby">Lobby</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/game">Play</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/game/california">California</a>
          </li>
        </ul>
      </div>
    </nav>
    <h1>This is home page</h1>
    {/* <h2>Click on the links below to navigate</h2>
    <div>
    <a href="/register"> register </a>
    </div>
    <div>
    <a href="/login"> login </a>
    </div>
    <div>
    <a href="/lobby">lobby</a>
    </div> */}
    </div>;
};

export default HomePage;