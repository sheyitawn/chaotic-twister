import React, { useEffect, useState } from 'react';
import MatDisplay from '../../components/MatDisplay/MatDisplay';
import { useNavigate } from 'react-router-dom';
import {
  connectToMat,
  onCirclePress,
  startCalibrationMode,
} from '../../services/matWebsocket';
import './calibrate.css';

function Calibrate() {
  const [sensorToCircleMap, setSensorToCircleMap] = useState({});
  const [currentSensor, setCurrentSensor] = useState(null); // waiting for this sensor to be mapped
  const [activeCircles, setActiveCircles] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    connectToMat();
    startCalibrationMode();

    onCirclePress((sensorIndex) => {
      if (!sensorToCircleMap[sensorIndex]) {
        setCurrentSensor(sensorIndex);
      }

      // show its current mapped circle if exists
      const mapped = sensorToCircleMap[sensorIndex];
      if (mapped !== undefined) {
        setActiveCircles((prev) =>
          prev.includes(mapped) ? prev : [...prev, mapped]
        );
      }
    });
  }, [sensorToCircleMap]);

  const handleCircleClick = (circleIndex) => {
    if (currentSensor !== null) {
      setSensorToCircleMap((prev) => ({
        ...prev,
        [currentSensor]: circleIndex,
      }));
      setActiveCircles((prev) =>
        prev.includes(circleIndex) ? prev : [...prev, circleIndex]
      );
      setCurrentSensor(null);
    }
  };

  const reset = () => {
    setSensorToCircleMap({});
    setActiveCircles([]);
    setCurrentSensor(null);
  };

  return (
    <div className="calibrate-container">
      <button className="back-button" onClick={() => navigate('/')}>
        ←
      </button>
      <h2 className="calibrate-title">Interactive Calibration</h2>
      <p className="calibrate-description">
        Press a sensor on the mat, then click the correct circle below to map it.
      </p>

      {currentSensor !== null && (
        <p className="calibrate-status">
          ✋ Sensor <strong>{currentSensor}</strong> pressed. Click a circle to map it.
        </p>
      )}

      <MatDisplay
        activeCircles={activeCircles}
        onCircleClick={handleCircleClick}
      />

      <div className="calibrate-buttons">
        <button className="calibrate-reset" onClick={reset}>
          Reset All
        </button>
      </div>
    </div>
  );
}

export default Calibrate;
