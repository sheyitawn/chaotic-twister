import React from 'react';
import './matdisplay.css';

const MatDisplay = ({ activeCircles, onCircleClick }) => {
  const rows = 4;
  const cols = 6;
  const total = rows * cols;

  return (
    <div className="mat-grid">
      {[...Array(total)].map((_, i) => {
        const row = Math.floor(i / cols);
        return (
          <div
            key={i}
            className={`mat-circle row-${row} ${activeCircles.includes(i) ? 'active' : ''}`}
            onClick={() => onCircleClick && onCircleClick(i)}
            title={`Index ${i}`}
          >
            {row}
            {/* Optional debug: <span>{i}</span> */}
          </div>
        );
      })}
    </div>
  );
};

export default MatDisplay;
