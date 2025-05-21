import React, { useEffect, useState } from 'react';
import MatDisplay from '../../components/MatDisplay';
import { connectToMat, startCalibrationMode, onCirclePress, disconnectMat } from '../../services/matWebsocket';
import './calibrate.css';

function Calibrate() {
  const [activeCircles, setActiveCircles] = useState([]);

 useEffect(() => {
  connectToMat();
  startCalibrationMode(); // 🧠 Switch mode

  onCirclePress((index) => {
    setActiveCircles((prev) =>
      prev.includes(index) ? prev : [...prev, index]
    );
  });

  return () => disconnectMat();
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
