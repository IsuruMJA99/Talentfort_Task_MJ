import React from 'react';
import './navbar.css';
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-inverse">
    <div className="container-fluid">
      <div className="navbar-header">
        <a className="navbar-brand" href='./LoginPage'>Profile</a>
      </div>
      <ul className="nav navbar-nav">
        <button className="nav-btn">LogOut</button>
        
      </ul>
    </div>
  </nav>
  );
}

export default Navbar;
