import React, { useState, useEffect, useRef } from "react";
// Hang importálása a mp3 mappából
import bellSound from "./mp3/chat.mp3"; 
// CSS importálása ugyanabból a mappából
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

  // Automatikus üdvözlő üzenet
  useEffect(() => {
    if (nameSubmitted) {
      setMessages([
        {
          sender: "admin",
          text: `Willkommen im Online-Chat, ${name}! Der Administrator wird sich in Kürze bei dir melden.`,
        },
      ]);
    }
  }, [nameSubmitted, name]);

  // Hangjelzés új üzenetnél
  useEffect(() => {
    if (messages.length > 1) {
      const audio = new Audio(bellSound);
      audio.play();
    }
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { sender: "user", text: input }]);
    setInput("");
  };

  return (
    <>
      {/* Chat ikon */}
      <div
        className="chat-icon"
        onClick={() => setOpen((prev) => !prev)}
        title="Chat mit uns"
      >
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
                onChange={(e) => setName(e.target.value)}
              />
              <button
                onClick={() => {
                  if (name.trim()) setNameSubmitted(true);
                }}
              >
                Starten
              </button>
            </div>
          ) : (
            <div className="chat-messages">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`message ${msg.sender === "admin" ? "admin" : "user"}`}
                >
                  {msg.text}
                </div>
              ))}
              <div ref={messagesEndRef}></div>
              <form onSubmit={handleSend} className="chat-input-form">
                <input
                  type="text"
                  placeholder="Schreibe eine Nachricht..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
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