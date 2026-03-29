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

  // Scroll aljára
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Firestore real-time listener
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

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    await addDoc(collection(db, "messages"), {
      name,
      text: input,
      createdAt: new Date()
    });

    setInput("");
  };

  return (
    <>
      <div className="chat-icon" onClick={() => setOpen(prev => !prev)}>
        💬
      </div>

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
                <div key={i} className={`message ${msg.name === name ? "user" : "admin"}`}>
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