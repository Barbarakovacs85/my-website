import React, { useEffect, useState } from "react";
import "./Galerie.css";

// 📸 TE KÉPEID (kétpontos fájlnevek!)
import img1 from "./img/1..jpg";
import img2 from "./img/2..jpg";
import img3 from "./img/3..jpg";
import img4 from "./img/4..jpg";
import img5 from "./img/5..webp";
import img6 from "./img/6..jpg";
import img7 from "./img/7..jpg";
import img8 from "./img/8..webp";
import img9 from "./img/9..jpg";
import img10 from "./img/10..jpg";
import img11 from "./img/11..jpg";
import img12 from "./img/12..webp";
import img13 from "./img/13..jpg";
import img14 from "./img/14..jpg";
import img15 from "./img/15..webp";
import img16 from "./img/16..jpg";
import img17 from "./img/17..jpg";
import img18 from "./img/18..jpg";
import img19 from "./img/19..jpg";
import img20 from "./img/20..jpg";

const images = [
  img1,img2,img3,img4,img5,
  img6,img7,img8,img9,img10,
  img11,img12,img13,img14,img15,
  img16,img17,img18,img19,img20
];

export default function Galerie() {
  const [faces, setFaces] = useState([]);

  const randomFaces = () => {
    const shuffled = [...images].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 6);
  };

  useEffect(() => {
    setFaces(randomFaces());

    const interval = setInterval(() => {
      setFaces(randomFaces());
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  if (faces.length < 6) return null;

  return (
    <div className="scene">
      <div className="gallery">

        <img src={faces[0]} alt="" />
        <img src={faces[1]} alt="" />
        <img src={faces[2]} alt="" />
        <img src={faces[3]} alt="" />
        <img src={faces[4]} alt="" />
        <img src={faces[5]} alt="" />

      </div>
    </div>
  );
}