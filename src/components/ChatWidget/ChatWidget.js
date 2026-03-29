// src/components/ChatWidget/ChatWidget.js
import React, { useState, useEffect, useRef } from "react";
import { db } from "../../firebase"; // a firebase.js helye
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot
} from "firebase/firestore";
import "./ChatWidget.css";

function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [nameSubmitted, setNameSubmitted] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  // Scroll a chat aljára
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Valós idejű listener a Firestore üzenetekhez
  useEffect(() => {
    if (!nameSubmitted) return;

    const q = query(
      collection(db, "messages"),
      orderBy("createdAt", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => doc.data());
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [nameSubmitted]);

  // Automatikus üdvözlő üzenet a Firestore-ba
  useEffect(() => {
    if (nameSubmitted) {
      const sendWelcomeMessage = async () => {
        await addDoc(collection(db, "messages"), {
          name: "Admin",
          text: `Willkommen im Online-Chat, ${name}! Der Administrator wird sich in Kürze bei dir melden.`,
          createdAt: new Date()
        });
      };
      sendWelcomeMessage();
    }
  }, [nameSubmitted, name]);

  // Üzenet küldése Firestore-ba
  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    await addDoc(collection(db, "messages"), {
      name,
      text: input,
      createdAt: new Date()
    });

    setInput(""); // Input mező törlése
  };

  return (
    <>
      {/* Chat ikon */}
      <div className="chat-icon" onClick={() => setOpen(prev => !prev)}>
        💬
      </div>

      {/* Chat ablak */}
      {open && (
        <div className="chat-box">
          {!nameSubmitted ? (
            <div className="chat-name-form">
              <h3>Bitte Name eingeben:</h3>
              <input
                type="text"
                placeholder="Dein Name"
                value={name}
                onChange={e => setName(e.target.value)}
              />
              <button onClick={() => { if (name.trim()) setNameSubmitted(true); }}>
                Starten
              </button>
            </div>
          ) : (
            <div className="chat-messages">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`message ${msg.name === name ? "user" : "admin"}`}
                >
                  <strong>{msg.name}: </strong>{msg.text}
                </div>
              ))}
              <div ref={messagesEndRef}></div>

              <form onSubmit={handleSend} className="chat-input-form">
                <input
                  type="text"
                  placeholder="Schreibe eine Nachricht..."
                  value={input}
                  onChange={e => setInput(e.target.value)}
                />
                <button type="submit">Senden</button>
              </form>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default ChatWidget;