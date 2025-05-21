import React, { createContext, useContext, useState, useEffect } from 'react';

const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [numPlayers, setNumPlayers] = useState(() => {
    // Try to get from localStorage first
    const saved = localStorage.getItem('numPlayers');
    return saved ? parseInt(saved) : 1;
  });

  // Store in localStorage when it changes
  useEffect(() => {
    localStorage.setItem('numPlayers', numPlayers);
  }, [numPlayers]);

  return (
    <PlayerContext.Provider value={{ numPlayers, setNumPlayers }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayers = () => useContext(PlayerContext);
