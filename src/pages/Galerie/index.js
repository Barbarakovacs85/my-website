import React, { useState, useEffect } from "react";
import "./Galerie.css";

const images = [
  "https://picsum.photos/id/1015/900/900",
  "https://picsum.photos/id/1016/900/900",
  "https://picsum.photos/id/1018/900/900",
  "https://picsum.photos/id/1020/900/900",
  "https://picsum.photos/id/1024/900/900",
  "https://picsum.photos/id/1027/900/900",
  "https://picsum.photos/id/1035/900/900",
  "https://picsum.photos/id/1039/900/900",
  "https://picsum.photos/id/1024/900/900",
  "https://picsum.photos/id/1027/900/900",
  "https://picsum.photos/id/1035/900/900",
  "https://picsum.photos/id/1039/900/900",
  "https://picsum.photos/id/1024/900/900",
  "https://picsum.photos/id/1027/900/900"
];

export default function Galerie() {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);

  const angleStep = 360 / images.length;

  useEffect(() => {
    if (open) return;

    const t = setInterval(() => {
      setActive((p) => (p + 1) % images.length);
    }, 2500);

    return () => clearInterval(t);
  }, [open]);

  return (
    <div className="page">

      {/* TITLE */}
      <div className="content">
        <h2>FARBENSPIEL GALERIE</h2>
        <h2>FARBENSPIEL GALERIE</h2>
      </div>

      {/* 3D GALLERY */}
      <div className="container">
        <div className="scene">
          <div className="ring">

            {images.map((img, i) => {
              const angle = i * angleStep - active * angleStep;

              return (
                <div
                  key={i}
                  className="item"
                  onClick={() => {
                    setActive(i);
                    setOpen(true);
                  }}
                  style={{
                    transform: `rotateY(${angle}deg) translateZ(500px)`
                  }}
                >

                  {/* IMAGE + REFLECTION */}
                  <div className="imgWrap">

                    <img className="mainImg" src={img} alt="" />

                    <div
                      className="reflection"
                      style={{ backgroundImage: `url(${img})` }}
                    />

                  </div>

                </div>
              );
            })}

          </div>
        </div>
      </div>

      {/* LIGHTBOX */}
      {open && (
        <div className="lightbox" onClick={() => setOpen(false)}>

          <button
            className="nav left"
            onClick={(e) => {
              e.stopPropagation();
              setActive((p) => (p - 1 + images.length) % images.length);
            }}
          >
            ‹
          </button>

          <img
            src={images[active]}
            alt=""
            onClick={(e) => e.stopPropagation()}
          />

          <button
            className="nav right"
            onClick={(e) => {
              e.stopPropagation();
              setActive((p) => (p + 1) % images.length);
            }}
          >
            ›
          </button>

          <span
            className="close"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(false);
            }}
          >
            ×
          </span>
        </div>
      )}

    </div>
  );
}