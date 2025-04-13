import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EnergyQuestion.css';

function EnergyQuestion() {
  const [energy, setEnergy] = useState(5);
  const navigate = useNavigate();

  const handleNext = () => {
    // Save energy value if needed
    navigate('/mood');
  };

  return (
    <div className="energy-question-container">
      <h1>How energetic do you feel today?</h1>
      <div className="slider-container">
        <input
          type="range"
          min="1"
          max="10"
          value={energy}
          onChange={(e) => setEnergy(e.target.value)}
          className="slider"
        />
        <div className="slider-labels">
          <span>1</span>
          <span>5</span>
          <span>10</span>
        </div>
      </div>
      <p className="energy-level-display">Energy Level: <strong>{energy}</strong></p>
      <button onClick={handleNext} className="next-button">Next</button>
    </div>
  );
}

export default EnergyQuestion;
