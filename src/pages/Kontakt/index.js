import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import "./Kontakt.css";
import contactImg from "./img/contact.png";

function Kontakt() {
  const [stars, setStars] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    emailjs.init("3pLPDIzlzah218zM-");

    const generatedStars = Array.from({ length: 60 }).map(() => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
      delay: Math.random() * 3,
      size: Math.random() * 2 + 1,
    }));

    setStars(generatedStars);
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus("LOADING");

    emailjs
      .sendForm(
        "service_cccze6x",
        "template_1defhvi",
        e.target
      )
      .then(
        () => {
          setStatus("SUCCESS");
          e.target.reset();
        },
        () => {
          setStatus("ERROR");
        }
      );
  };

  return (
    <div className="contact-page">

      {/* BACKGROUND */}
      <div
        className="background"
        style={{ backgroundImage: `url(${contactImg})` }}
      />

      {/* STARS */}
      {stars.map((star, i) => (
        <span
          key={i}
          className="star"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            animationDelay: `${star.delay}s`,
            width: `${star.size}px`,
            height: `${star.size}px`,
          }}
        />
      ))}

      {/* WRAPPER (3 BOX) */}
      <div className="contact-wrapper">

        {/* BAL: INFO */}
        <div className="info-box">
          <h3>Kontakt</h3>
          <p><strong>Cégnév:</strong> Saját Cég</p>
          <p><strong>Email:</strong> info@ceg.hu</p>
          <p><strong>Telefon:</strong> +41 79 123 4567</p>
        </div>

        {/* KÖZÉP: FORM */}
        <form className="contact-box" onSubmit={sendEmail}>
          <h2>Kontakt</h2>
          <p>Wir freuen uns auf deine Nachricht</p>

          <input type="text" name="name" placeholder="Name" required />
          <input type="email" name="email" placeholder="Email" required />
          <textarea name="message" rows="5" placeholder="Nachricht" required />

          <button type="submit">
            {status === "LOADING" ? "Sending..." : "Send"}
          </button>

          {status === "SUCCESS" && (
            <p style={{ color: "#0f0" }}>Sikeres küldés!</p>
          )}

          {status === "ERROR" && (
            <p style={{ color: "red" }}>Hiba történt!</p>
          )}
        </form>

        {/* JOBB: MAP */}
        <div className="map-box">
          <h3>Adresse:</h3>
          <p>Poststrasse 9a<br />9443 Widnau</p>

          <iframe
            title="map"
            src="https://www.google.com/maps?q=9443+Widnau+Poststrasse+9&output=embed"
          />
        </div>

      </div>

    </div>
  );
}

export default Kontakt;