import React, { useState } from "react";
import "./Kontakt.css";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

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
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact">
      <div className="contact-wrapper">

        {/* LEFT */}
        <div className="contact-left">

          <h2>Contact Us</h2>

          <p className="contact-desc">
            Write us a message and we will reply soon.
          </p>

          <div className="info">
            <p>📍 9443 Widnau, Poststrasse 5</p>
            <p>📞 +41 xxx xxx xxx</p>
            <p>✉ info@email.com</p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="form">

            <input
              name="name"
              placeholder="Full Name"
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
              placeholder="Message..."
              value={form.message}
              onChange={handleChange}
              required
            />

            <button
              className="hero-3d-button"
              type="submit"
              disabled={loading}
            >
              <span>{loading ? "Sending..." : "Send Message"}</span>
            </button>

            {success && <p className="success">Message sent ✅</p>}
          </form>
        </div>

        {/* RIGHT - MAP */}
        <div className="contact-right">
          <iframe
            title="map"
            src="https://www.google.com/maps?q=Poststrasse%205%2C%209443%20Widnau&output=embed"
            loading="lazy"
          ></iframe>
        </div>

      </div>
    </section>
  );
}

export default Contact;