import React from "react";
import {Link} from "react-router-dom";


import './App.css';
function Navbar(){
    
    return (
        <>
        
        <nav className="navbar navbar-expand-lg navbar-light ">
            <div className="container-fluid">
            <Link to="/" className="navbar-brand"><img className="img" src="./../images/logo.png" alt="logo"/></Link>
               
            </div>
            </nav>
          
        
        </>
    );
}

export default Navbar;