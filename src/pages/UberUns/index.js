import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./UberUns.css";
import enImage from "./en.jpg"; // ✔️ EZ A HELYES KÉP BEHÍVÁS

function UberUns() {
  const [animate, setAnimate] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setAnimate(false);

    const t = setTimeout(() => {
      setAnimate(true);
    }, 100);

    return () => clearTimeout(t);
  }, [location.pathname]);

  return (
    <div className="aboutPage">

      <h1 className="title">Über Uns</h1>

      <div className={`aboutContainer ${animate ? "show" : ""}`}>

        {/* LEFT IMAGE */}
        <div className="leftSide">
          <img src={enImage} alt="Barbara" />
        </div>

        {/* RIGHT TEXT */}
        <div className="rightSide">
          <p>
            Willkommen auf der Seite von Färbenspiel!
            <br /><br />
            Ich bin Barbara, zweifache Mutter, und die Gründerin dieses Bastelgeschäfts.
            <br /><br />
            Hier findest du gebrauchte Spielzeuge und individuelle Bastelprodukte.
            <br /><br />
            Ich freue mich sehr auf deinen Besuch und hoffe,
            dass du hier viel Freude und Inspiration findest.
          </p>
        </div>

      </div>
    </div>
  );
}

export default UberUns;