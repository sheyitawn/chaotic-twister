import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MatDisplay from '../../components/MatDisplay/MatDisplay';
import { connectToMat, startCalibrationMode, onCirclePress, disconnectMat } from '../../services/matWebsocket';
import './calibrate.css';

function Calibrate() {
  const [activeCircles, setActiveCircles] = useState([]);

  const navigate = useNavigate();
  
 useEffect(() => {
  connectToMat();
  startCalibrationMode();

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
      <button className="back-button" onClick={() => navigate('/')}>
        ←
      </button>
      <h2 className="calibrate-title">CALIBRATION</h2>
      <p className="calibrate-description"><b>Step on a circle to test pressure detection.</b></p>

      

      <MatDisplay activeCircles={activeCircles} />

      <div className="calibrate-buttons">
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}

export default Calibrate;
