import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      {/* BAL FELSŐ LOGÓ FELIRAT */}
      <div className="text">
        <h1>GARDROBE</h1>
      </div>

      {/* JOBB OLDALI MENÜ */}
      <ul className="nav-list">
        <li>
          <Link to="/">
            Startseite<span></span>
          </Link>
        </li>
        <li>
          <Link to="/über-uns">
            Über Uns<span></span>
          </Link>
        </li>
        <li>
          <Link to="/dienstleistungen">
            Galerie<span></span>
          </Link>
        </li>
        <li>
          <Link to="/produkte">
            Workshop<span></span>
          </Link>
        </li>
        <li>
          <Link to="/kontakt">
            Kontakt<span></span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;