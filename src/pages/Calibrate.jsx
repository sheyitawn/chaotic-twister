import React, { useEffect, useState } from 'react';
import MatDisplay from '../components/MatDisplay';
import './calibrate.css';

function Calibrate() {
  const [activeCircles, setActiveCircles] = useState([]);

  // Simulate random sensor data for testing
  useEffect(() => {
    const interval = setInterval(() => {
      const index = Math.floor(Math.random() * 24); // 0 to 23
      setActiveCircles([index]); // Simulates 1 pressed circle at a time
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="calibrate-container">
      <h2 className="calibrate-title">Mat Calibration</h2>
      <p className="calibrate-description">Step on a circle to test pressure detection.</p>

      <MatDisplay activeCircles={activeCircles} />
    </div>
  );
}

export default Calibrate;
