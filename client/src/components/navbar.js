import { React, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { NavLink } from "react-router-dom";

export default function Navbar({isAuth}) {

    const getURL = () => {
        return window.location.pathname.slice(0, window.location.pathname.lastIndexOf('/') + 1)
    }

    function NavList(){
        if (isAuth && (getURL() === "/waitingroom/") ){
            return (
                <div>
                    <NavLink className="game px-5" to="/lobby">Exit Game</NavLink>
                    {console.log(getURL())}
                </div>
            )
        }
        else if (isAuth){
            return (
                <div>
                    <NavLink className="home px-5" to="/">Rules</NavLink>
                    <NavLink className="lobby px-5" to="/lobby">Lobby</NavLink>
                    <NavLink className="logout px-5" to="/logout">Logout</NavLink>
                </div>
                
            );
        }
        else {
            return (
                <div>
                    <NavLink className="register px-5" to="/register">Register</NavLink>
                    <NavLink className="login px-5" to="/login">Login</NavLink>
                </div>
            );
        }
    }
    return (
        <div>
        <div className="container">
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <NavLink className="navbar-brand" to="/">Out of Town - Speed</NavLink>
                <div className="navbar mx-auto">
                    <NavList />
                </div>
            </nav>
        </div>
        </div>
)}