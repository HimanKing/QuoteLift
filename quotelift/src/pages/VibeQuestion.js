import React, { useState, useEffect } from "react";
import "./VibeQuestion.css";

const VibeQuestion = () => {
  const [mood, setMood] = useState("");
  const [energyLevel, setEnergyLevel] = useState("");
  const [goal, setGoal] = useState("");
  const [quote, setQuote] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchQuote = async (mood, energy, goal) => {
    try {
      setLoading(true);
      setError("");
      const response = await fetch("http://localhost:5000/get-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mood, energyLevel: energy, goal }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch quote. Please try again.");
      }

      const data = await response.json();
      setQuote(data.quote || "No quote found.");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchQuote(mood, energyLevel, goal);
  };

  return (
    <div className="vibe-container">
      <h2>Get Your Motivational Quote</h2>
      <form onSubmit={handleSubmit} className="quote-form">
        <div>
          <label>Mood:</label>
          <input
            type="text"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            placeholder="e.g., happy, stressed"
            required
          />
        </div>
        <div>
          <label>Energy Level:</label>
          <input
            type="text"
            value={energyLevel}
            onChange={(e) => setEnergyLevel(e.target.value)}
            placeholder="e.g., high, low"
            required
          />
        </div>
        <div>
          <label>Goal:</label>
          <input
            type="text"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="e.g., motivation, focus"
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Get Quote
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {quote && (
        <div className="quote-box">
          <p>{quote}</p>
        </div>
      )}
    </div>
  );
};

export default VibeQuestion;
