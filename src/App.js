import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Play from './pages/Play/Play';
import Calibrate from './pages/Calibrate/Calibrate';
import { PlayerProvider } from './context/PlayerContext';

function App() {
  return (
    <PlayerProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/play" element={<Play />} />
          <Route path="/calibrate" element={<Calibrate />} />
        </Routes>
      </Router>
    </PlayerProvider>
  );
}

export default App;
