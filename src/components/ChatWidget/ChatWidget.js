import React, { useState, useEffect, useRef } from "react";
import "./ChatWidget.css";

function ChatWidget() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [name, setName] = useState("User"); // egyszerűen beállítunk egy nevet
  const messagesEndRef = useRef(null);

  const backendUrl = "http://localhost:3001";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Üzenetek lekérése
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch(`${backendUrl}/messages`);
        const data = await res.json();
        setMessages(data);
      } catch (err) {
        console.error("Hiba a backend lekérésénél:", err);
      }
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 3000); // 3 mp-enként frissít
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    try {
      await fetch(`${backendUrl}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, text: input }),
      });
      setInput("");
      // azonnal frissítjük az üzeneteket
      const res = await fetch(`${backendUrl}/messages`);
      const data = await res.json();
      setMessages(data);
    } catch (err) {
      console.error("Hiba az üzenet küldésénél:", err);
    }
  };

  return (
    <div className="chat-container">
      <ul className="chat">
        {messages.map((msg, i) => (
          <li
            key={i}
            className={`message ${msg.name === name ? "right" : "left"}`}
          >
            <img
              className="logo"
              src={`https://randomuser.me/api/portraits/${
                msg.name === name ? "men/67" : "women/17"
              }.jpg`}
              alt={msg.name}
            />
            <p>{msg.text}</p>
          </li>
        ))}
        <div ref={messagesEndRef}></div>
      </ul>
      <form onSubmit={handleSend}>
        <input
          type="text"
          className="text_input"
          placeholder="Message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </form>
    </div>
  );
}

export default ChatWidget;