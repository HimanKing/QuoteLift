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
  const [animationClass, setAnimationClass] = useState(""); // State for animation class

  const handleNext = React.useCallback(() => {
    if (selectedVibe) {
      setAnimationClass("slide-out-left"); // Trigger slide-out animation
      setTimeout(() => {
        const quotesForVibe = QUOTES[selectedVibe];
        setCurrentIndex((prevIndex) => (prevIndex + 1) % quotesForVibe.length); // Update to the next quote
        setAnimationClass("slide-in-right"); // Trigger slide-in animation
      }, 500); // Match the animation duration
    }
  }, [selectedVibe]);

  const handleBack = React.useCallback(() => {
    if (selectedVibe) {
      setAnimationClass("slide-out-right"); // Trigger slide-out animation
      setTimeout(() => {
        const quotesForVibe = QUOTES[selectedVibe];
        setCurrentIndex((prevIndex) =>
          (prevIndex - 1 + quotesForVibe.length) % quotesForVibe.length
        ); // Update to the previous quote
        setAnimationClass("slide-in-left"); // Trigger slide-in animation
      }, 800); // Match the animation duration
      setTimeout(() => {
        setAnimationClass(""); // Reset animation class after animation completes
      }, 1600); // Ensure reset happens after both animations
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
    setAnimationClass("slide-up-from-bottom"); // Trigger slide-up animation
    const quotesForVibe = QUOTES[vibe];
    const randomIndex = Math.floor(Math.random() * quotesForVibe.length); // Generate a random index
    setCurrentIndex(randomIndex); // Set to a random quote
    setTimeout(() => {
      setAnimationClass(""); // Reset animation class after animation completes
    }, 1200); // Match the animation duration
  };

  const speakQuote = () => {
    if ('speechSynthesis' in window && typedQuote) {
      const utterance = new SpeechSynthesisUtterance(`${typedQuote} by ${currentAuthor}`);
      const voices = window.speechSynthesis.getVoices();
      const femaleVoice = voices.find(voice => 
        voice.name.includes("Google UK English Female") || 
        voice.name.includes("Google US English") || 
        voice.name.includes("Microsoft Zira") // Select a female human-like voice
      );
      if (femaleVoice) {
        utterance.voice = femaleVoice;
      }
      window.speechSynthesis.speak(utterance);
    }
  };

  const currentAuthor = selectedVibe 
    ? QUOTES[selectedVibe][currentIndex]?.split(" — ")[1] || "Unknown" // Ensure valid author
    : "";

  return (
    <div className="vibe-container" style={{
      overflow: "auto", // Allow scrolling if necessary
      padding: "20px", // Add padding to ensure space around the flashcard
      width: "100%", // Ensure the container spans the full width
      height: "100vh", // Ensure the container spans the full viewport height
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center", // Center the flashcard vertically
      boxSizing: "border-box" // Include padding in the width and height calculation
    }}>
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
        <div className={`flashcard-container ${animationClass}`} style={{
          display: "flex",
          justifyContent: "center", // Center the flashcard horizontally
          alignItems: "center", // Center the flashcard vertically
          width: "100%", // Ensure the container spans the full width
          maxWidth: "1000px", // Limit the maximum width of the container
          padding: "20px", // Add padding around the flashcard
          boxSizing: "border-box", // Include padding in the width calculation
          position: "relative" // Enable positioning for buttons
        }}>
          <button onClick={handleBack} className="flashcard-button" style={{
            position: "absolute",
            left: "10px", // Position on the left side
            bottom: "50%", // Align vertically with the flashcard
            transform: "translateY(50%)"
          }}>
            Back
          </button>
          <div className="flashcard" style={{
            border: "2px solid #ccc",
            borderRadius: "15px", // Slightly more rounded corners
            padding: "50px", // Increased padding for more space
            boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)", // Slightly larger shadow
            maxWidth: "700px", // Increased width
            width: "100%", // Ensure the flashcard adjusts to the container
            textAlign: "center",
            backgroundColor: "#fff",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            cursor: "pointer"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.2)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.15)";
          }}>
            <div className="quote-box" style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center", // Center the quote text vertically
              height: "100%", // Use full height of the flashcard
              gap: "20px", // Add spacing between elements
              padding: "20px" // Add padding for better spacing
            }}>
              <p style={{
                fontSize: "1.5rem",
                lineHeight: "2",
                textAlign: "center",
                margin: "0 20px" // Add horizontal margin for better spacing
              }}>{typedQuote}</p>
              <p className="quote-author" style={{
                fontSize: "1rem", // Reduced font size for the author
                textAlign: "center",
                marginTop: "20px" // Add spacing above the author
              }}>— {currentAuthor}</p>
            </div>
            <button onClick={speakQuote} className="speaker-button" style={{
              position: "absolute",
              bottom: "10px",
              right: "10px",
              padding: "0.5rem",
              fontSize: "1rem",
              border: "none",
              borderRadius: "50%",
              backgroundColor: "#4caf50",
              color: "white",
              cursor: "pointer",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
            }}>
              🔊
            </button>
          </div>
          <button onClick={handleNext} className="flashcard-button" style={{
            position: "absolute",
            right: "10px", // Position on the right side
            bottom: "50%", // Align vertically with the flashcard
            transform: "translateY(50%)"
          }}>
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default VibeQuestion;
