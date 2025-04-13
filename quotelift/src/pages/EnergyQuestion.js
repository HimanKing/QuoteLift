import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './EnergyQuestion.css';

function EnergyQuestion() {
  const [energy, setEnergy] = useState(5);
  const [backgroundColor, setBackgroundColor] = useState('rgb(128, 0, 128)'); // Default color
  const navigate = useNavigate();

  const handleNext = () => {
    // Save energy value if needed
    navigate('/mood');
  };

  useEffect(() => {
    // Calculate softer colors based on energy level
    const red = Math.min(200, Math.floor((energy / 10) * 200)); // Softer warm tones
    const blue = 200 - red; // Softer cool tones
    setBackgroundColor(`rgb(${red}, 50, ${blue})`); // Add a constant green value for balance
  }, [energy]);

  return (
    <div
      className="energy-question-container"
      style={{ backgroundColor }} // Dynamically set background color
    >
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
