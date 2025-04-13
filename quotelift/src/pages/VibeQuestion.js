import React, { useState, useEffect } from "react";
import "./VibeQuestion.css";
import QUOTES from "../quotes"; // Import the quotes

const VIBE_OPTIONS = [
  "🎯 Deep Focus",
  "💗 Self-Worth",
  "🔥 Motivation",
  "🛏️ Rest & Recovery",
  "🎨 Creative Spark",
];

const VibeQuestion = () => {
  const [selectedVibe, setSelectedVibe] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0); // Track the current quote index

  const handleNext = React.useCallback(() => {
    if (selectedVibe) {
      const quotesForVibe = QUOTES[selectedVibe];
      setCurrentIndex((prevIndex) => (prevIndex + 1) % quotesForVibe.length); // Loop to the first quote
    }
  }, [selectedVibe]);

  const handleBack = React.useCallback(() => {
    if (selectedVibe) {
      const quotesForVibe = QUOTES[selectedVibe];
      setCurrentIndex((prevIndex) =>
        (prevIndex - 1 + quotesForVibe.length) % quotesForVibe.length
      ); // Loop to the last quote
    }
  }, [selectedVibe]);

  useEffect(() => {
    const flashcards = document.querySelectorAll('.flashcard');
    let isDragging = false;
    let startX = 0;

    flashcards.forEach((flashcard) => {
      flashcard.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
        flashcard.classList.add('dragging');
      });

      flashcard.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const deltaX = e.clientX - startX;
        flashcard.style.transform = `translateX(${deltaX}px)`;
      });

      flashcard.addEventListener('mouseup', (e) => {
        isDragging = false;
        flashcard.classList.remove('dragging');
        const deltaX = e.clientX - startX;

        if (deltaX > 100) {
          // Move to the next flashcard
          flashcard.classList.add('hidden');
          setTimeout(() => flashcard.style.transform = '', 500);
        } else if (deltaX < -100) {
          // Move to the previous flashcard
          flashcard.classList.add('hidden');
          setTimeout(() => flashcard.style.transform = '', 500);
        } else {
          // Reset position
          flashcard.style.transform = '';
        }
      });

      flashcard.addEventListener('mouseleave', () => {
        if (isDragging) {
          isDragging = false;
          flashcard.classList.remove('dragging');
          flashcard.style.transform = '';
        }
      });
    });

    let currentIndex = 0;

    function showNextFlashcard() {
      if (currentIndex < flashcards.length - 1) {
        const currentFlashcard = flashcards[currentIndex];
        const nextFlashcard = flashcards[currentIndex + 1];

        currentFlashcard.classList.add('hidden');
        nextFlashcard.classList.remove('hidden');

        currentIndex++;
      }
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        showNextFlashcard();
      }
    });
  }, []);

  useEffect(() => {
    const flashcards = document.querySelectorAll('.flashcard');

    flashcards.forEach((flashcard) => {
      flashcard.addEventListener('click', (e) => {
        const rect = flashcard.getBoundingClientRect();
        const clickX = e.clientX;

        if (clickX < rect.left + rect.width / 2) {
          // Clicked on the left side, go to the previous flashcard
          handleBack();
        } else {
          // Clicked on the right side, go to the next flashcard
          handleNext();
        }
      });
    });

    return () => {
      flashcards.forEach((flashcard) => {
        flashcard.removeEventListener('click', () => {});
      });
    };
  }, [handleNext, handleBack]);

  const handleVibeSelect = (vibe) => {
    setSelectedVibe(vibe);
    setCurrentIndex(0); // Reset to the first quote when a new vibe is selected
  };

  const currentQuote = selectedVibe
    ? QUOTES[selectedVibe][currentIndex].split(" — ")[0]
    : "";
  const currentAuthor = selectedVibe
    ? QUOTES[selectedVibe][currentIndex].split(" — ")[1] || "Unknown"
    : "";

  return (
    <div className="vibe-container">
      <h2>What kind of vibe do you need today?</h2>
      <div className="vibe-options">
        {VIBE_OPTIONS.map((vibe) => (
          <button
            key={vibe}
            className={`vibe-button ${selectedVibe === vibe ? "selected" : ""}`}
            onClick={() => handleVibeSelect(vibe)}
          >
            {vibe}
          </button>
        ))}
      </div>

      {selectedVibe && (
        <div className="flashcard">
          <div className="quote-box">
            <h3>Your Quote:</h3>
            <p>{currentQuote}</p>
            <p className="quote-author">— {currentAuthor}</p>
          </div>
          <div className="flashcard-controls">
            <button onClick={handleBack} className="flashcard-button">
              Back
            </button>
            <button onClick={handleNext} className="flashcard-button">
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VibeQuestion;
