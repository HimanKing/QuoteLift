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
  const [typedQuote, setTypedQuote] = useState(""); // State for typing effect

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
        flashcard.style.transform = `translateX(${deltaX}px)`; // Move flashcard
      });

      flashcard.addEventListener('mouseup', (e) => {
        isDragging = false;
        flashcard.classList.remove('dragging');
        const deltaX = e.clientX - startX;

        if (deltaX > 100) {
          // Move to the next flashcard
          flashcard.style.transform = '';
          handleNext();
        } else if (deltaX < -100) {
          // Move to the previous flashcard
          flashcard.style.transform = '';
          handleBack();
        } else {
          // Reset position
          flashcard.style.transform = '';
        }
      });

      flashcard.addEventListener('mouseleave', () => {
        if (isDragging) {
          isDragging = false;
          flashcard.classList.remove('dragging');
          flashcard.style.transform = ''; // Reset position
        }
      });
    });

    return () => {
      flashcards.forEach((flashcard) => {
        flashcard.removeEventListener('mousedown', () => {});
        flashcard.removeEventListener('mousemove', () => {});
        flashcard.removeEventListener('mouseup', () => {});
        flashcard.removeEventListener('mouseleave', () => {});
      });
    };
  }, [handleNext, handleBack]);

  useEffect(() => {
    if (selectedVibe) {
      const fullQuote = QUOTES[selectedVibe][currentIndex]?.split(" — ")[0] || ""; // Ensure fullQuote is valid
      let index = 0;
      setTypedQuote(""); // Reset the typed quote

      const typingInterval = setInterval(() => {
        if (index <= fullQuote.length) { // Include the first letter
          setTypedQuote(fullQuote.slice(0, index)); // Use slice to avoid undefined
          index++;
        } else {
          clearInterval(typingInterval);
        }
      }, 50); // Adjust typing speed here

      return () => clearInterval(typingInterval);
    }
  }, [selectedVibe, currentIndex]);

  const handleVibeSelect = (vibe) => {
    setSelectedVibe(vibe);
    setCurrentIndex(0); // Reset to the first quote when a new vibe is selected
  };

  const currentAuthor = selectedVibe
    ? QUOTES[selectedVibe][currentIndex]?.split(" — ")[1] || "Unknown" // Ensure valid author
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
        <div className="flashcard-container">
          <div className="flashcard" style={{
            border: "2px solid #ccc",
            borderRadius: "10px",
            padding: "20px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            maxWidth: "400px",
            margin: "20px auto",
            textAlign: "center",
            backgroundColor: "#fff",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            cursor: "pointer"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.2)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
          }}>
            <div className="quote-box">
              <h3>Your Quote:</h3>
              <p>{typedQuote}</p> {/* Use the typed quote */}
              <p className="quote-author">— {currentAuthor}</p>
            </div>
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
