import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MatDisplay from '../../components/MatDisplay/MatDisplay';
import { connectToMat, startCalibrationMode, onCirclePress, disconnectMat } from '../../services/matWebsocket';
import './calibrate.css';
import ShockTest from '../../components/ShockTest/ShockTest';

function Calibrate() {
  const [activeCircles, setActiveCircles] = useState([]);
  const [currentSensor, setCurrentSensor] = useState(null);
  const [sensorToMatMap, setSensorToMatMap] = useState({});


  const navigate = useNavigate();
  
 useEffect(() => {
  connectToMat();
  startCalibrationMode();

  onCirclePress((sensorIndex) => {
    setCurrentSensor(sensorIndex);
    console.log("🎯 Detected sensor press:", sensorIndex);
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

      

      <MatDisplay
        activeCircles={Object.values(sensorToMatMap)}
        onCircleClick={(circleIndex) => {
          if (currentSensor !== null) {
            setSensorToMatMap((prev) => ({
              ...prev,
              [currentSensor]: circleIndex
            }));
            console.log(`✅ Assigned Sensor ${currentSensor} → Circle ${circleIndex}`);
            setCurrentSensor(null); // reset
          }
        }}
      />


      <div className="calibrate-buttons">
        <button onClick={handleReset}>Reset</button>
        <ShockTest />
      </div>
    </div>
  );
}

export default Calibrate;
