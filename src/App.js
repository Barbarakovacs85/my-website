import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Startseite from './pages/Startseite';
import Galerie from './pages/Galerie';
import ÜberUns from './pages/UberUns';
import Produkte from './pages/Produkte';
import Kontakt from './pages/Kontakt';

function App() {
  return (
    <BrowserRouter>
      {/* Navbar mindig látszik */}
      <Navbar />

      {/* Oldalak */}
      <Routes>
        <Route path="/" element={<Startseite />} />
        <Route path="/Galerie" element={<Galerie />} />
        <Route path="/über-uns" element={<ÜberUns />} />
        <Route path="/produkte" element={<Produkte />} />
        <Route path="/kontakt" element={<Kontakt />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;