import React from 'react';
import { usePlayers } from '../../context/PlayerContext';
import { getSocket } from '../../services/matWebsocket';
import './shocktest.css';

function ShockTest() {
  const { numPlayers } = usePlayers();

  const handleShock = (playerNum) => {
    const socket = getSocket(); // ⬅️ get latest WebSocket

    if (!socket) {
      console.warn("🚫 No WebSocket connection found.");
      return;
    }

    if (socket.readyState !== WebSocket.OPEN) {
      console.warn("🔌 WebSocket not open:", socket.readyState);
      return;
    }

    const message = {
      type: 'shockPlayer',
      number: playerNum
    };

    console.log(`📤 Sending shock command:`, message);
    socket.send(JSON.stringify(message));
  };

  return (
    <div className="shock-test">
      <h2 className="shock-title">Shock Intensity Test</h2>
      <p className="shock-description">Test the strength of the shockers for each player.</p>
      <div className="shock-buttons">
        {[...Array(numPlayers)].map((_, i) => (
          <button key={i} onClick={() => handleShock(i + 1)} className="shock-button">
            ⚡ Shock Player {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ShockTest;
