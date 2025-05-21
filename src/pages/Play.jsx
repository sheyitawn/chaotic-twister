import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './play.css';

const bodyParts = ["Right Hand", "Left Hand", "Right Foot", "Left Foot"];
const colors = ["Red", "Yellow", "Green", "Blue"];

const getRandomInstruction = () => {
  const part = bodyParts[Math.floor(Math.random() * bodyParts.length)];
  const color = colors[Math.floor(Math.random() * colors.length)];
  return `${part} on ${color}`;
};

function Play() {
  const location = useLocation();
  const numPlayers = location.state?.players || 1;

  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [instruction, setInstruction] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);

  const nextPlayer = () => {
    setCurrentPlayer((prev) => (prev % numPlayers) + 1);
  };

  const startCountdown = () => {
    setCountdown(6);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          console.log("Time's up! Shock the player.");
          nextPlayer();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const spin = () => {
    setIsSpinning(true);
    setInstruction('Spinning...');
    setTimeout(() => {
      const newInstruction = getRandomInstruction();
      setInstruction(newInstruction);
      startCountdown();
      setIsSpinning(false);
    }, 1000);
  };

  return (
    <div className="play-container">
      <h1 className="play-title">CHAOTIC TWISTER</h1>

      <p className="play-player">Player {currentPlayer}'s turn</p>

      <div className="play-instruction">
        {instruction || 'Press SPIN to start'}
      </div>

      {countdown > 0 && (
        <div className="play-countdown">{countdown}</div>
      )}

      <button
        onClick={spin}
        disabled={isSpinning || countdown > 0}
        className={`play-button ${isSpinning || countdown > 0 ? 'disabled' : ''}`}
      >
        {isSpinning ? 'Spinning...' : 'SPIN'}
      </button>
    </div>
  );
}

export default Play;
