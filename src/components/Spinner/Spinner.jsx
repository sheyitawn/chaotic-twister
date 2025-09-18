import React, { useState } from 'react';
import './spinner.css';

// Manually defined spinner segments (ordered clockwise from top)
const segments = [
  { color: 'GREEN', bodyPart: 'Right Hand' },
  { color: 'YELLOW', bodyPart: 'Right Hand' },
  { color: 'RED', bodyPart: 'Right Hand' },
  { color: 'BLUE', bodyPart: 'Right Hand' },
  { color: 'GREEN', bodyPart: 'Right Leg' },
  { color: 'YELLOW', bodyPart: 'Right Leg' },
  { color: 'RED', bodyPart: 'Right Leg' },
  { color: 'BLUE', bodyPart: 'Right Leg' },
  { color: 'GREEN', bodyPart: 'Left Leg' },
  { color: 'YELLOW', bodyPart: 'Left Leg' },
  { color: 'RED', bodyPart: 'Left Leg' },
  { color: 'BLUE', bodyPart: 'Left Leg' },
  { color: 'GREEN', bodyPart: 'Right Leg' },
  { color: 'YELLOW', bodyPart: 'Right Leg' },
  { color: 'RED', bodyPart: 'Right Leg' },
  { color: 'BLUE', bodyPart: 'Right Leg' },
]

const Spinner = ({ onSpinComplete }) => {
  const [angle, setAngle] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);

  const spin = () => {
    if (isSpinning) return;

    const sectionCount = segments.length;
    const sectionAngle = 360 / sectionCount;
    const fullSpins = 5;

    const selectedIndex = Math.floor(Math.random() * sectionCount);
    const targetAngle = 360 - selectedIndex * sectionAngle; // so selected lands at top
    const totalRotation = fullSpins * 360 + targetAngle;

    setIsSpinning(true);
    setAngle((prev) => prev + totalRotation);

    setTimeout(() => {
      const selectedSegment = segments[selectedIndex];
      onSpinComplete({
        ...selectedSegment,
        index: selectedIndex
      });
      setIsSpinning(false);
    }, 3000);
  };

  return (
    <div className="spinner-container">
      {/* <div className="spinner-pointer" /> */}
      <div
        className={`spinner-wheel ${isSpinning ? 'spinning' : ''}`}
        style={{ transform: `rotate(${angle}deg)` }}
        onClick={spin}
      >
        <div className="spinner-center">SPIN</div>
      </div>
    </div>
  );
};

export default Spinner;
