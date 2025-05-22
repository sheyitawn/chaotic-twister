import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlayers } from '../../context/PlayerContext';
import './home.css';

function Home() {
  const { numPlayers, setNumPlayers } = usePlayers();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = parseInt(e.target.value);
    setNumPlayers(value);
  };

  const handleStart = () => {
  setTimeout(() => {
    navigate('/play');
  }, 50); // short delay lets the context finish updating
};


  return (
    <div className="home-container">
      <h1 className="home-title">CHAOTIC TWISTER</h1>

      <div className="home-buttons">
        <button
          onClick={handleStart}
          className="home-button play"
        >
          Play
        </button>

        <button
          onClick={() => navigate('/calibrate')}
          className="home-button calibrate"
        >
          Calibrate
        </button>
      </div>
      

      <div className='home-footer'>
        <p className="home-label">PLAYERS:</p>
        <select
          value={numPlayers}
          onChange={handleChange}
          className="home-select"
        >
          {[1, 2, 3, 4, 5].map(n => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
      </div>
      


    </div>
  );
}

export default Home;
