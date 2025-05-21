import React, { useEffect, useState } from 'react';
import MatDisplay from '../components/MatDisplay';
import { connectToMat, onCirclePress, disconnectMat } from '../services/matWebsocket';
import './calibrate.css';

function Calibrate() {
  const [activeCircles, setActiveCircles] = useState([]);

  useEffect(() => {
  connectToMat();

  const handleNewCircle = (index) => {
    setActiveCircles((prev) => {
      // If reset happened, allow this again
      if (!prev.includes(index)) {
        return [...prev, index];
      }
      return prev;
    });
  };

  onCirclePress(handleNewCircle);

  return () => {
    disconnectMat();
  };
}, []);


  const handleReset = () => {
  setActiveCircles([]);         // clears visual state
};


  return (
    <div className="calibrate-container">
      <h2 className="calibrate-title">Mat Calibration</h2>
      <p className="calibrate-description">Step on a circle to test pressure detection.</p>

      <div className="calibrate-buttons">
        <button onClick={handleReset}>Reset</button>
      </div>

      <MatDisplay activeCircles={activeCircles} />
    </div>
  );
}

export default Calibrate;
