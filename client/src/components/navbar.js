import { React, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { NavLink } from "react-router-dom";

export default function Navbar({isAuth}) {

    // const getURL = () => {
    //     return window.location.pathname.slice(0, window.location.pathname.lastIndexOf('/') + 1)
    // }

    function NavList(){
        if (isAuth){
            return (
                <div>
                    <NavLink className="home px-5" to="/">Rules</NavLink>
                    <NavLink className="lobby px-5" to="/lobby">Lobby</NavLink>
                    <NavLink className="high_scores px-5" to="/highscore">High Scores</NavLink>
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
        
            <nav className="navbar navbar-dark bg-dark">
                <NavLink className="navbar-brand" to="/">Out of Town - Speed</NavLink>
                <div className="navbar mx-auto">
                    <NavList />
                </div>
            </nav>
        
        </div>
)}