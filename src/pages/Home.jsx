import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [players, setPlayers] = useState(1);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-200">
      <h1 className="text-4xl font-bold mb-6">Chaotic Twister</h1>
      
      <label className="mb-2 font-semibold text-lg">Number of Players:</label>
      <select
        value={players}
        onChange={(e) => setPlayers(parseInt(e.target.value))}
        className="mb-6 p-2 text-lg rounded"
      >
        {[1, 2, 3, 4, 5].map(n => (
          <option key={n} value={n}>{n}</option>
        ))}
      </select>

      <button
        onClick={() => navigate('/play', { state: { players } })}
        className="mb-4 px-6 py-2 bg-green-500 text-white text-lg rounded hover:bg-green-600"
      >
        Play
      </button>

      <button
        onClick={() => navigate('/calibrate')}
        className="px-6 py-2 bg-blue-500 text-white text-lg rounded hover:bg-blue-600"
      >
        Calibrate
      </button>
    </div>
  );
}

export default Home;
