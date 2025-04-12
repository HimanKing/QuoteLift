import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function MoodQuestion() {
  const [mood, setMood] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (mood) {
      // You could store the mood somewhere here
      navigate('/vibe');
    } else {
      alert('Please select a mood first');
    }
  };

  return (
    <div className="question-page">
      <h1>How are you feeling today?</h1>
      <select value={mood} onChange={(e) => setMood(e.target.value)}>
        <option value="">-- Select a mood --</option>
        <option value="happy">😊 Happy</option>
        <option value="sad">😢 Sad</option>
        <option value="excited">😄 Excited</option>
        <option value="sleepy">😴 Sleepy</option>
        <option value="stressed">😣 Stressed</option>
      </select>
      <br />
      <button onClick={handleSubmit}>Next</button>
    </div>
  );
}

export default MoodQuestion;

















// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// function MoodQuestion() {
//   const [mood, setMood] = useState('');


// //   const handleSubmit = () => {
// //     alert(`You’re feeling: ${mood}`);
// //     // you can send data to AI or backend here
// //   };

//   const navigate = useNavigate();

// const handleSubmit = () => {
//   if (mood) {
//     navigate('/vibe');
//   } else {
//     alert('Please select a mood first');
//   }
// };

//   return (
//     <div className="question-page">
//       <h1>How are you feeling today?</h1>
//       <select value={mood} onChange={(e) => setMood(e.target.value)}>
//         <option value="">-- Select a mood --</option>
//         <option value="happy">😊 Happy</option>
//         <option value="sad">😢 Sad</option>
//         <option value="excited">😄 Excited</option>
//         <option value="sleepy">😴 Sleepy</option>
//         <option value="stressed">😣 Stressed</option>
//       </select>
//       <br />
//       <button onClick={handleSubmit}>Submit</button>
//     </div>
//   );
// }

// export default MoodQuestion;



// import React, { useState } from 'react';

// function MoodQuestion() {
//   const [mood, setMood] = useState('');

//   const handleMoodChange = (event) => {
//     setMood(event.target.value);
//   };

//   const handleSubmit = () => {
//     alert(`You are feeling ${mood} today!`);
//   };

//   return (
//     <div className="question-page">
//       <h1>How are you feeling today?</h1>
//       <select value={mood} onChange={handleMoodChange}>
//         <option value="">Select your mood</option>
//         <option value="happy">Happy</option>
//         <option value="sad">Sad</option>
//         <option value="excited">Excited</option>
//         <option value="sleepy">Sleepy</option>
//         <option value="angry">Angry</option>
//       </select>
//       <button onClick={handleSubmit}>Submit</button>
//     </div>
//   );
// }

// export default MoodQuestion;
