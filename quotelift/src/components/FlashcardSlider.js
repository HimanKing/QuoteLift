import React, { useState } from "react";
import "./FlashcardSlider.css";

const FlashcardSlider = ({ quotes }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % quotes.length);
  };

  const handleBack = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex - 1 + quotes.length) % quotes.length
    );
  };

  return (
    <div className="flashcard-slider">
      {quotes.map((quote, index) => (
        <div
          key={index}
          className={`flashcard ${
            index === currentIndex
              ? "active"
              : index === (currentIndex - 1 + quotes.length) % quotes.length
              ? "previous"
              : "next"
          }`}
        >
          <p className="quote-text">{quote.split(" — ")[0]}</p>
          <p className="quote-author">— {quote.split(" — ")[1] || "Unknown"}</p>
        </div>
      ))}
      <button className="nav-button back" onClick={handleBack}>
        Back
      </button>
      <button className="nav-button next" onClick={handleNext}>
        Next
      </button>
    </div>
  );
};

export default FlashcardSlider;
