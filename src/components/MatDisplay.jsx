import React from 'react';
import './matdisplay.css';

const MatDisplay = ({ activeCircles }) => {
  const rows = 6;
  const cols = 4;

  return (
    <div className="mat-grid">
      {[...Array(rows * cols)].map((_, i) => (
        <div
          key={i}
          className={`mat-circle ${activeCircles.includes(i) ? 'active' : ''}`}
        />
      ))}
    </div>
  );
};

export default MatDisplay;
