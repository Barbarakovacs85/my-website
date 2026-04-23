import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import "./Kontakt.css";
import contactImg from "./img/contact.png";

function Kontakt() {
  const [stars, setStars] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
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

    emailjs
      .sendForm(
        "service_cccze6x",
        "template_1defhvi",
        e.target,
        "3pLPDIzlzah218zM-"
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

      <div
        className="background"
        style={{ backgroundImage: `url(${contactImg})` }}
      />

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

      <div className="form-wrapper">
        <form className="contact-box" onSubmit={sendEmail}>
          <h2>Kontakt Me</h2>
          <p>Wir freuen uns auf deine Nachricht</p>

          <input type="text" name="name" placeholder="Name" required />
          <input type="email" name="email" placeholder="Email" required />
          <textarea name="message" rows="5" placeholder="Message" required />

          <button type="submit">Send</button>

          {status === "SUCCESS" && (
            <p style={{ color: "#0f0" }}>Message sent!</p>
          )}

          {status === "ERROR" && (
            <p style={{ color: "red" }}>Error sending message.</p>
          )}
        </form>
      </div>

    </div>
  );
}

export default Kontakt;