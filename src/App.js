import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import ChatLauncher from './components/ChatLauncher';
import CookieBanner from './components/CookieBanner';

import Startseite from './pages/Startseite';
import Galerie from './pages/Galerie';
import UberUns from './pages/UberUns';
import Produkte from './pages/Produkte';
import Kontakt from './pages/Kontakt';

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Startseite />} />
        <Route path="/galerie" element={<Galerie />} />
        <Route path="/uber-uns" element={<UberUns />} />
        <Route path="/produkte" element={<Produkte />} />
        <Route path="/kontakt" element={<Kontakt />} />
      </Routes>

      {/* saját chat */}
      <ChatLauncher />

      {/* 🍪 COOKIE BANNER */}
      <CookieBanner />

    </BrowserRouter>
  );
}

export default App;