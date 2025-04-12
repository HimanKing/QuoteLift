import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function EnergyQuestion() {
  const [energy, setEnergy] = useState(5);
  const navigate = useNavigate();

  const handleNext = () => {
    // you can save energy value somewhere if needed
    navigate('/mood');
  };

  return (
    <div className="question-page">
      <h1>On a scale of 1 to 10, how energetic do you feel?</h1>
      <input
        type="range"
        min="1"
        max="10"
        value={energy}
        onChange={(e) => setEnergy(e.target.value)}
        className="slider"
      />
      <p>Energy level: {energy}</p>
      <button onClick={handleNext}>Next</button>
    </div>
  );
}

export default EnergyQuestion;













// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// function EnergyQuestion() {
//   const [energyLevel, setEnergyLevel] = useState(5); // Default energy is 5
//   const navigate = useNavigate();

//   const handleSliderChange = (event) => {
//     setEnergyLevel(event.target.value);
//   };

//   const handleNextPage = () => {
//     // Smooth transition to the next page
//     navigate.push('/mood');
//   };

//   return (
//     <div className="question-page">
//       <h1>On a scale of 1 to 10, how energetic do you feel?</h1>
//       <input
//         type="range"
//         min="1"
//         max="10"
//         value={energyLevel}
//         onChange={handleSliderChange}
//         className="slider"
//         id="energySlider"
//       />
//       <p>{energyLevel}</p>
//       <button onClick={handleNextPage}>Next</button>
//     </div>
//   );
// }

// export default EnergyQuestion;
