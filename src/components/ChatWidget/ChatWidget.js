import React, { useState, useEffect, useRef } from "react";
import "./ChatWidget.css";

import { app } from "../../firebase";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp
} from "firebase/firestore";

const db = getFirestore(app);

function ChatWidget() {
  const [open, setOpen] = useState(false);

  const [mode, setMode] = useState(null);
  const [name, setName] = useState("");
  const [userCode, setUserCode] = useState("");

  const [nameSubmitted, setNameSubmitted] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const messagesEndRef = useRef(null);

  // ❌ RESET (X gomb)
  const handleReset = () => {
    setOpen(false);
    setMode(null);
    setName("");
    setUserCode("");
    setNameSubmitted(false);
    setMessages([]);
    setInput("");
  };

  // 🔥 realtime listener
  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(
        snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
      );
    });

    return () => unsubscribe();
  }, []);

  // scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // send message
  const handleSend = async (e) => {
    e.preventDefault();

    if (!input.trim() || !name) return;

    try {
      await addDoc(collection(db, "messages"), {
        text: input,
        sender: name,
        mode: mode,
        code: userCode || null,
        createdAt: serverTimestamp()
      });

      setInput("");
    } catch (err) {
      console.error("Chat error:", err);
    }
  };

  return (
    <>
      <div className="chat-icon" onClick={() => setOpen(!open)}>
        💬
      </div>

      {open && (
        <div className="chat-box">

          {/* ❌ X */}
          <button className="close-btn" onClick={handleReset}>
            ✕
          </button>

          {/* MODE */}
          {!mode ? (
            <div className="chat-name-form">
              <h3>Wie möchten Sie fortfahren?</h3>

              <div className="mode-buttons">
                <button onClick={() => setMode("guest")}>
                  Als Gast
                </button>

                <button onClick={() => setMode("user")}>
                  Als Benutzer
                </button>
              </div>

              <p className="welcome-text">
                Herzlich Willkommen bei Garderobe Chat!
              </p>
            </div>

          ) : !nameSubmitted ? (

            <form
              className="chat-name-form"
              onSubmit={(e) => {
                e.preventDefault();
                if (name.trim()) setNameSubmitted(true);
              }}
            >
              <h3>
                {mode === "guest"
                  ? "Bitte geben Sie Ihren Namen ein:"
                  : "Name und Code eingeben:"}
              </h3>

              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
              />

              {mode === "user" && (
                <input
                  value={userCode}
                  onChange={(e) => setUserCode(e.target.value)}
                  placeholder="Code"
                />
              )}

              <button type="submit">Starten</button>

              {/* 🔙 vissza gomb */}
              <button
                type="button"
                className="back-btn"
                onClick={() => {
                  setMode(null);
                  setName("");
                  setUserCode("");
                }}
              >
                ← Zurück
              </button>

            </form>

          ) : (
            <>
              <div className="chat-messages">

                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`message ${
                      msg.sender === name ? "user" : "admin"
                    }`}
                  >
                    <b>{msg.sender}:</b> {msg.text}
                  </div>
                ))}

                <div ref={messagesEndRef} />
              </div>

              <form onSubmit={handleSend} className="chat-input-form">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Schreiben..."
                />
                <button type="submit">Senden</button>
              </form>
            </>
          )}

        </div>
      )}
    </>
  );
}

export default ChatWidget;