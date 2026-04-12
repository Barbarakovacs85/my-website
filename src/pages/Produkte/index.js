import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Producte.css";

import img1 from "./img/3dsticker.png";
import img2 from "./img/diamondpainting.png";
import img3 from "./img/fenstermalerei.png";
import img4 from "./img/neseser.png";
import img5 from "./img/t-shirtmaler.png";

const slides = [
  { src: img1, title: "3D Sticker" },
  { src: img2, title: "Diamond Painting" },
  { src: img3, title: "Fenstermalerei" },
  { src: img4, title: "Neseser" },
  { src: img5, title: "T-Shirt" }
];

export default function ProductIndex() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState("next");

  const navigate = useNavigate();
  const timeoutRef = useRef(null);

  const next = () => {
    setDirection("next");
    setIndex((prev) => (prev + 1) % slides.length);
  };

  const prev = () => {
    setDirection("prev");
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    timeoutRef.current = setTimeout(next, 6000);
    return () => clearTimeout(timeoutRef.current);
  }, [index]);

  const current = slides[index];

  const handleApply = () => {
    navigate(`/kontakt?workshop=${encodeURIComponent(current.title)}`);
  };

  const reorderedThumbs = [
    ...slides.slice(index),
    ...slides.slice(0, index)
  ];

  return (
    <div className="carousel">

      <div className="gallery">

        {/* MAIN IMAGE */}
        <div className="list">
          <div key={index} className={`slide active ${direction}`}>
            <img src={current.src} alt={current.title} />
          </div>
        </div>

        {/* THUMBNAILS */}
        <div className="thumbnailWrap">

          <div className="thumbnail">
            {reorderedThumbs.map((item, i) => (
              <div
                key={i}
                className="thumb"
                onClick={() => setIndex((index + i) % slides.length)}
              >
                <img src={item.src} alt={item.title} />
              </div>
            ))}
          </div>

         <button className="applyBtnSide" onClick={handleApply}>
  <span>Workshop anmelden</span>
  <span></span>
  <span>Workshop anmelden</span>
  <span></span>
</button>

        </div>

      </div>

      {/* PROGRESS */}
      <div className="time"></div>

    </div>
  );
}