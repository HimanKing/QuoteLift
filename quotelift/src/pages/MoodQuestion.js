import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MoodQuestion.css';

function MoodQuestion() {
  const [mood, setMood] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (mood) {
      navigate('/vibe');
    } else {
      alert('Please select a mood first');
    }
  };

  return (
    <div className="mood-question-container">
      <h1>How are you feeling today?</h1>
      <div className="mood-options">
        <button
          className={`mood-button ${mood === 'happy' ? 'selected' : ''}`}
          onClick={() => setMood('happy')}
        >
          😊 Happy
        </button>
        <button
          className={`mood-button ${mood === 'sad' ? 'selected' : ''}`}
          onClick={() => setMood('sad')}
        >
          😢 Sad
        </button>
        <button
          className={`mood-button ${mood === 'excited' ? 'selected' : ''}`}
          onClick={() => setMood('excited')}
        >
          😄 Excited
        </button>
        <button
          className={`mood-button ${mood === 'sleepy' ? 'selected' : ''}`}
          onClick={() => setMood('sleepy')}
        >
          😴 Sleepy
        </button>
        <button
          className={`mood-button ${mood === 'stressed' ? 'selected' : ''}`}
          onClick={() => setMood('stressed')}
        >
          😣 Stressed
        </button>
      </div>
      <button onClick={handleSubmit} className="next-button">Next</button>
    </div>
  );
}

export default MoodQuestion;
