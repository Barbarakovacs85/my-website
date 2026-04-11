import React, { useState } from "react";
import "./Kontakt.css";

function Kontakt() {
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setSuccess(false);

    try {
      const res = await fetch("http://localhost:3001/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Hiba");

      setSuccess(true);
      setForm({ name: "", email: "", message: "" });

    } catch (err) {
      alert("Hiba: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="closet">

      {/* 🚪 DOOR (ONLY UNTIL OPEN) */}
      {!open && (
        <div className="doors" onClick={() => setOpen(true)}>
          <div className="door left-door">
            <span>Öffnen</span>
          </div>
          <div className="door right-door">
            <span>Öffnen</span>
          </div>
        </div>
      )}

      {/* 🧠 INSIDE */}
      {open && (
        <div className="inside">

          {/* LEFT */}
          <div className="panel left">

            <div className="hanger">
              <div className="hanger-line"></div>

              <div className="icons">
                <i className="fa-brands fa-facebook-f"></i>
                <i className="fa-brands fa-whatsapp"></i>
                <i className="fa-brands fa-tiktok"></i>
                <i className="fa-brands fa-instagram"></i>
              </div>
            </div>

            <div className="contact-info">
              <h2>Gardrobe Widnau</h2>
              <p>📍 Poststrasse 5<br />9443 Widnau</p>
              <p>📞 +41 78 700 4340</p>
            </div>

            <div className="opening">
              <h3>Öffnungszeiten</h3>
              <p>Mo–Fr: 07:00–11:30 / 13:30–19:00</p>
              <p>Sa: 07:00–17:00</p>
              <p>So: geschlossen</p>
            </div>

          </div>

          {/* CENTER */}
          <div className="panel center">
            <form onSubmit={handleSubmit}>
              <h2>Nachricht senden</h2>

              <input
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                required
              />

              <input
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
              />

              <textarea
                name="message"
                placeholder="Nachricht..."
                value={form.message}
                onChange={handleChange}
                required
              />

              <button type="submit" disabled={loading}>
                {loading ? "Senden..." : "Senden"}
              </button>

              {success && (
                <p className="success">Nachricht gesendet ✅</p>
              )}
            </form>
          </div>

          {/* RIGHT */}
          <div className="panel right">
            <iframe
              title="map"
              src="https://www.google.com/maps?q=Poststrasse%205%2C%209443%20Widnau&output=embed"
            />
          </div>

        </div>
      )}

    </div>
  );
}

export default Kontakt;