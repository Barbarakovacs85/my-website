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
  const [name, setName] = useState("");
  const [nameSubmitted, setNameSubmitted] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const messagesEndRef = useRef(null);

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

  // scroll down
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

          {/* NAME STEP */}
          {!nameSubmitted ? (
            <form
              className="chat-name-form"
              onSubmit={(e) => {
                e.preventDefault();
                if (name.trim()) setNameSubmitted(true);
              }}
            >
              <h3>Bitte geben Sie Ihren Namen ein:</h3>

              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
              />

              <button type="submit">Starten</button>
            </form>
          ) : (
            <>
              {/* MESSAGES */}
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

              {/* INPUT */}
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