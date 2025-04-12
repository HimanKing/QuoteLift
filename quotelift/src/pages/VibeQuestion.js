import React, { useState } from 'react';

function VibeQuestion() {
  const [vibe, setVibe] = useState('');

  const handleSelect = (v) => {
    setVibe(v);
    alert(`You chose: ${v}`);
  };

  const vibeOptions = [
    { label: '🎯 Deep Focus', value: 'focus' },
    { label: '💗 Self-Worth', value: 'self-worth' },
    { label: '🔥 Motivation', value: 'motivation' },
    { label: '🛏️ Rest & Recovery', value: 'rest' },
    { label: '🎨 Creative Spark', value: 'creative' },
  ];

  return (
    <div className="question-page">
      <h1>What kind of vibe do you need today?</h1>
      <p>Choose the one that best fits your mood or goal:</p>
      <div className="vibe-options">
        {vibeOptions.map((opt) => (
          <button
            key={opt.value}
            className={`vibe-button ${vibe === opt.value ? 'selected' : ''}`}
            onClick={() => handleSelect(opt.value)}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default VibeQuestion;
