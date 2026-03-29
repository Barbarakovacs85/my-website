import React from 'react';
import bild from './img/bild.png';
import './Startseite.css';

function Startseite() {
  return (
    <div className="startseite">
      <div className="hero">
        <img src={bild} alt="hero" className="hero-img" />
        <div className="overlay"></div>
        <div className="hero-text">
          <h1>Willkommen bei Gardrobe</h1>
          <p>Secondhand & Stil</p>
          <button className="hero-button">Mehr erfahren</button>
        </div>
      </div>
    </div>
  );
}

export default Startseite;