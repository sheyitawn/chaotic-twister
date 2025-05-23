import React from 'react';
import './matdisplay.css';

const MatDisplay = ({ activeCircles, onCircleClick }) => {
  const rows = 4;
  const cols = 6;

  return (
    <div className="mat-grid">
      {[...Array(rows * cols)].map((_, i) => {
        const row = Math.floor(i / cols);
        return (
          <div
            key={i}
            className={`mat-circle row-${row} ${activeCircles.includes(i) ? 'active' : ''}`}
            onClick={() => onCircleClick && onCircleClick(i)}
          />
        );
      })}
    </div>
  );
};


export default MatDisplay;
