import React, { useState } from 'react';
import './spinner.css';

const bodyParts = ['Left Hand', 'Right Hand', 'Left Foot', 'Right Foot'];
const colors = ['RED', 'GREEN', 'BLUE', 'YELLOW'];

const Spinner = ({ onSpinComplete }) => {
  const [angle, setAngle] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);

  const spin = () => {
    if (isSpinning) return;

    const sections = 16;
    const sectionAngle = 360 / sections;
    const spins = 5;

    // Pick random segment
    const selectedIndex = Math.floor(Math.random() * sections);

    // Total spin rotation so selected lands at 0deg (top)
    const totalRotation = spins * 360 + (360 - selectedIndex * sectionAngle);

    setIsSpinning(true);
    setAngle((prev) => prev + totalRotation);

    setTimeout(() => {
      const partIndex = Math.floor(selectedIndex / 4); // 0–3
      const colorIndex = selectedIndex % 4;             // 0–3

      const result = {
        bodyPart: bodyParts[partIndex],
        color: colors[colorIndex],
        index: selectedIndex
      };

      onSpinComplete(result);
      setIsSpinning(false);
    }, 3000); // match transition time
  };

  return (
    <div className="spinner-container">
      <div className="spinner-pointer" />
      <div
        className="spinner-wheel"
        style={{ transform: `rotate(${angle}deg)` }}
        onClick={spin}
      >
        <div className="spinner-center">SPIN</div>
      </div>
    </div>
  );
};

export default Spinner;
