import React, { useState, useEffect, useRef } from "react";
import "./ChatWidget.css";

function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [nameSubmitted, setNameSubmitted] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [inactivePrompt, setInactivePrompt] = useState(false);
  const [chatClosed, setChatClosed] = useState(false);
  const messagesEndRef = useRef(null);

  const inactivityTime = 60000; // 1 perc
  let inactivityTimer = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!chatClosed) resetInactivityTimer();
    return () => clearTimeout(inactivityTimer.current);
  }, [messages, chatClosed]);

  const resetInactivityTimer = () => {
    clearTimeout(inactivityTimer.current);
    inactivityTimer.current = setTimeout(() => {
      if (!chatClosed) {
        setInactivePrompt(true);
        addMessage("admin", "Kann ich Ihnen noch weiterhelfen?");
      }
    }, inactivityTime);
  };

  const addMessage = (sender, text) => {
    setMessages(prev => [...prev, { sender, text }]);
  };

  // Üdvözlés és első kérdés
  useEffect(() => {
    if (nameSubmitted) {
      addMessage("admin", `Willkommen im Online-Chat, ${name}!`);
      // rögtön felteszi a kérdést
      setTimeout(() => addMessage("admin", "Kann ich Ihnen helfen?"), 500);
      setInactivePrompt(true);
    }
  }, [nameSubmitted, name]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim() || chatClosed) return;

    addMessage("user", input);
    setInput("");
    setInactivePrompt(false);
    resetInactivityTimer();
  };

  const handlePromptResponse = (answer) => {
    if (answer === "ja") {
      addMessage("user", "Ja, ich möchte weiterchatten.");
      setInactivePrompt(false);
      resetInactivityTimer();
    } else {
      addMessage("admin", "Alles klar, danke für das Gespräch! Auf Wiedersehen!");
      setInactivePrompt(false);
      setChatClosed(true); // beszélgetés lezárva
    }
  };

  return (
    <>
      <div className="chat-icon" onClick={() => setOpen(prev => !prev)}>
        💬
      </div>

      {open && (
        <div className="chat-box">

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
                type="text"
                placeholder="Ihr Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <button type="submit">Starten</button>
            </form>
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

              {inactivePrompt && !chatClosed && (
                <div className="inactive-prompt">
                  <button onClick={() => handlePromptResponse("ja")}>Ja</button>
                  <button onClick={() => handlePromptResponse("nein")}>Nein</button>
                </div>
              )}

              {!chatClosed && (
                <form onSubmit={handleSend} className="chat-input-form">
                  <input
                    type="text"
                    placeholder="Schreiben Sie eine Nachricht..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  />
                  <button type="submit">Senden</button>
                </form>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default ChatWidget;