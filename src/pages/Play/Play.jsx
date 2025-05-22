import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlayers } from '../../context/PlayerContext';
import { connectToMat, onMatResult, sendColourToMat } from '../../services/matWebsocket';
import './play.css';
import Spinner from '../../components/Spinner/Spinner';
import { updateCurrentPlayer } from '../../services/matWebsocket';

const bodyParts = ["Right Hand", "Left Hand", "Right Foot", "Left Foot"];
const colors = ["Red", "Yellow", "Green", "Blue"];

const getRandomInstruction = () => {
  const part = bodyParts[Math.floor(Math.random() * bodyParts.length)];
  const color = colors[Math.floor(Math.random() * colors.length)];
  return `${part} on ${color}`;
};

function Play() {
  const { numPlayers } = usePlayers();
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [instruction, setInstruction] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState('');
  const [spinnerResult, setSpinnerResult] = useState(null);

  const navigate = useNavigate();


  const nextPlayer = () => {
    setCurrentPlayer((prev) => (prev % numPlayers) + 1);
    updateCurrentPlayer(currentPlayer);

  };

  useEffect(() => {
    console.log("🎮 New current player:", currentPlayer);
    console.log("🚀 ~ nextPlayer ~ numPlayers:", numPlayers)
  }, [currentPlayer]);


  const startCountdown = () => {
    let count = 2;
    setCountdown(count);

    const interval = setInterval(() => {
      count--;
      setCountdown(count);

      if (count <= 0) {
        clearInterval(interval);
        nextPlayer();
      }
    }, 1000);
  };


  const spin = () => {

    setIsSpinning(true);
    setInstruction('Spinning...');
    setResult('');

    setTimeout(() => {
      const newInstruction = getRandomInstruction();
      setInstruction(newInstruction);

      // Extract color and send to Arduino
      const colorWord = newInstruction.split(' on ')[1]; // "Red"
      let colorChar = colorWord[0].toUpperCase();        // "R"
      sendColourToMat(colorChar);
      console.log("📤 Sent to Arduino:", colorChar);

      startCountdown();
      setIsSpinning(false);

    }, 1000);
  };

  useEffect(() => {
    connectToMat();

    onMatResult((result) => {
      if (result === 'SAFE') setResult('✅ SAFE!');
      if (result === 'MISSED') setResult('💀 MISSED!');
    });
  }, []);



  return (
    <div className="play-container">
      <button className="back-button" onClick={() => navigate('/')}>
        ←
      </button>

      <h1 className="play-title">CHAOTIC TWISTER</h1>
        <div className="play-instruction">
          {instruction || 'Press SPIN to start!'}
        </div>
      
      

      {countdown > 0 && (
        <div className="play-countdown">{countdown}</div>
      )}

      {/* {result && (
        <div className="play-result">
          {result}
        </div>
      )} */}

      {/* <Spinner onSpinComplete={(result) => {
        console.log('🎯 Spinner landed on:', result);
        // result = { bodyPart: "Right Hand", color: "Green" }
      }} /> */}


      <Spinner
        onSpinComplete={(result) => {
          console.log('🎯 Spinner landed on:', result);

          // Show instruction
          const instructionText = `${result.bodyPart} on ${result.color}`;
          setInstruction(instructionText);
          setSpinnerResult(result);
          setResult('');

          // Send color to Arduino
          const colorChar = result.color[0].toUpperCase(); // R, G, B, Y
          sendColourToMat(colorChar);
          console.log("📤 Sent to Arduino:", colorChar);

          // Start countdown
          startCountdown();
        }}
      />

      {/* {spinnerResult && (
        <p className="play-instruction">
          🎲 {spinnerResult.bodyPart} on {spinnerResult.color}
        </p>
      )} */}





      {/* <div className="play-buttons">
        <button
          onClick={spin}
          disabled={isSpinning || countdown > 0}
          className={`play-button ${isSpinning || countdown > 0 ? 'disabled' : ''}`}
        >
          {isSpinning ? 'Spinning...' : 'SPIN'}
        </button>

      </div> */}

      <p className="play-player">Player {currentPlayer}'s turn</p>

      
      
    </div>
  );
}

export default Play;
