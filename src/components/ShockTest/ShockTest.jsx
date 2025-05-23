import React from 'react';
import { usePlayers } from '../../context/PlayerContext';
import './shocktest.css'; // Assuming you have a CSS file for styling

function ShockTest() {
  const { numPlayers } = usePlayers();

  const handleShock = (playerNum) => {
    if (window.socket?.readyState === WebSocket.OPEN) {
      window.socket.send(JSON.stringify({
        type: 'shockPlayer',
        number: playerNum
      }));
    }
  };

  return (
    <div className="shock-test">
      <h2>Shock Intensity Test</h2>
      {[...Array(numPlayers)].map((_, i) => (
        <button key={i} onClick={() => handleShock(i + 1)}>
          ⚡ Shock Player {i + 1}
        </button>
      ))}
    </div>
  );
}

export default ShockTest;
