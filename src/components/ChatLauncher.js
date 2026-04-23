import React, { useState } from "react";
import "./ChatLauncher.css";

export default function ChatLauncher() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState("choose");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const startChat = (type) => {
    console.log("Chat start:", type, name, email);
    setStep("chat");
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      { from: "user", text: input }
    ]);

    setInput("");
  };

  return (
    <>
      {/* FLOAT BUTTON */}
      <button className="chat-fab" onClick={() => setOpen(true)}>
        💬
      </button>

      {/* OVERLAY */}
      {open && (
        <div className="chat-overlay" onClick={() => setOpen(false)}>
          <div className="chat-modal" onClick={(e) => e.stopPropagation()}>

            {/* CLOSE */}
            <button className="chat-close" onClick={() => setOpen(false)}>
              ✕
            </button>

            {/* STEP 1 */}
            {step === "choose" && (
              <div className="chat-content">
                <h2>Herzlich Willkommen! 👋</h2>
                <p>Wie kann Ich Ihnen helfen?</p>

                <div className="chat-buttons">
                  <button onClick={() => startChat("guest")} className="btn guest">
                    👤 Guest
                  </button>

                  <button onClick={() => setStep("member")} className="btn member">
                    ⭐ Member
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2 */}
            {step === "member" && (
              <div className="chat-content">
                <h2>Member Login</h2>

                <input
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <input
                  placeholder="Email or Code"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <button className="btn member" onClick={() => startChat("member")}>
                  Login
                </button>

                <span className="back" onClick={() => setStep("choose")}>
                  ← Back
                </span>
              </div>
            )}

            {/* STEP 3 - CHAT */}
            {step === "chat" && (
              <div className="chat-layout">

                {/* SIDEBAR */}
                <aside className="chat-sidebar">
                  <input placeholder="Search..." />

                  <div className="chat-user">
                    <img src="https://i.pravatar.cc/40" alt="" />
                    <div>
                      <h4>Support</h4>
                      <span className="online">Online</span>
                    </div>
                  </div>
                </aside>

                {/* MAIN */}
                <div className="chat-main">

                  <div className="chat-header">
                    <h3>Support Chat</h3>
                  </div>

                  <div className="chat-messages">
                    {messages.map((msg, i) => (
                      <div
                        key={i}
                        className={msg.from === "user" ? "msg user" : "msg admin"}
                      >
                        {msg.text}
                      </div>
                    ))}
                  </div>

                  <div className="chat-input">
                    <input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Írj üzenetet..."
                    />
                    <button onClick={sendMessage}>➤</button>
                  </div>

                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </>
  );
}