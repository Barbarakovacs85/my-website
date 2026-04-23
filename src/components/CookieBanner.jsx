import React, { useState, useEffect } from "react";
import "./CookieBanner.css"; // 

function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) setVisible(true);
  }, []);

  const saveConsent = (type) => {
    localStorage.setItem("cookieConsent", type);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookieOverlay">
      <div className="cookieBox">

        <h3>🍪 Cookie Einstellungen</h3>

        <p>
          Diese Website verwendet Cookies zur Verbesserung der Benutzererfahrung.
        </p>

        <div className="cookieButtons">
          <button onClick={() => saveConsent("necessary")}>
            Nur notwendige
          </button>

          <button
            onClick={() => saveConsent("all")}
            className="primary"
          >
            Alle akzeptieren
          </button>
        </div>

        <small>
          Du kannst deine Auswahl jederzeit ändern.
        </small>

      </div>
    </div>
  );
}

export default CookieBanner;