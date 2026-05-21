import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">

      {/* LOGO / BAL OLDAL */}
      <div className="text">
        <h1>FARBENSPIEL</h1>
      </div>

      {/* 🍔 HAMBURGER (MOBIL) */}
      <div
        className={`hamburger ${menuOpen ? "active" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* MENÜ */}
      <ul className={`nav-list ${menuOpen ? "open" : ""}`}>
        <li>
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Startseite<span></span>
          </Link>
        </li>

        <li>
          <Link to="/uber-uns" onClick={() => setMenuOpen(false)}>
            Über Uns<span></span>
          </Link>
        </li>

        <li>
          <Link to="/galerie" onClick={() => setMenuOpen(false)}>
            Galerie<span></span>
          </Link>
        </li>

        <li>
          <Link to="/produkte" onClick={() => setMenuOpen(false)}>
            Workshop<span></span>
          </Link>
        </li>

        <li>
          <Link to="/kontakt" onClick={() => setMenuOpen(false)}>
            Kontakt<span></span>
          </Link>
        </li>
      </ul>

    </nav>
  );
}

export default Navbar;