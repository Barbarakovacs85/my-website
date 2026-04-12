import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./Kontakt.css";

function Kontakt() {
  const [open, setOpen] = useState(false);

  const location = useLocation();
  const workshop = new URLSearchParams(location.search).get("workshop");

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔥 AUTOMATIKUS WORKSHOP SZÖVEG
  useEffect(() => {
    if (workshop) {
      setForm((prev) => ({
        ...prev,
        message: `Sehr geehrte Damen und Herren,

hiermit möchte ich mich für den Workshop "${workshop}" anmelden.

Ich freue mich auf Ihre Rückmeldung.

Mit freundlichen Grüßen`
      }));
    }
  }, [workshop]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setSuccess(false);

    try {
      const res = await fetch("/.netlify/functions/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      if (!res.ok) throw new Error("Hiba");

      setSuccess(true);
      setForm({ name: "", email: "", message: "" });

    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="closet">

      {!open && (
        <div className="doors" onClick={() => setOpen(true)}>
          <div className="door left-door"><span>Öffnen</span></div>
          <div className="door right-door"><span>Öffnen</span></div>
        </div>
      )}

      {open && (
        <div className="inside">

          <div className="panel left">
            <div className="contact-info">
              <h2>Gardrobe Widnau</h2>
              <p>📍 Poststrasse 5<br />9443 Widnau</p>
              <p>📞 +41 78 700 4340</p>

              {workshop && (
                <p className="workshop-tag">
                  🎨 Workshop: <b>{workshop}</b>
                </p>
              )}
            </div>
          </div>

          <div className="panel center">

            <form onSubmit={handleSubmit}>
              <h2>Workshop Anmeldung</h2>

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