import React from "react";
import { Link } from "react-router-dom";
import ChatWidget from "../../components/ChatWidget/ChatWidget"; // FIGYELEM: ../../
import bild from "./img/bild.png";
import "./Startseite.css";

function Startseite() {
  return (
    <div className="startseite">
      <div className="hero">
        <img src={bild} alt="hero" className="hero-img" />
        <div className="overlay"></div>

        <div className="hero-text">
          <h1>Willkommen bei Gardrobe </h1>
          <p>Kreative workshop & Kinder Secondhand</p>

          <Link to="/produkte" className="hero-3d-button">
            <span>workshop</span>
            <span></span>
            <span>workshop</span>
            <span></span>
          </Link>
        </div>
      </div>

      <ChatWidget />
    </div>
  );
}

export default Startseite;