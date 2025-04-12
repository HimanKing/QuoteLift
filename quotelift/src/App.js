import React, { useState, useEffect } from 'react';
import './App.css';
import Quote from './components/Quote';

// Dummy data for quotes, you can replace this with dynamic data later
const quotes = [
  "Believe you can and you're halfway there.",
  "The only way to do great work is to love what you do.",
  "Success is not final, failure is not fatal: It is the courage to continue that counts.",
  "You miss 100% of the shots you don't take."
];

function App() {
  const [quote, setQuote] = useState('');

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  };

  useEffect(() => {
    getRandomQuote();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>QuoteLift</h1>
        <p>Your daily dose of motivation!</p>
        <Quote quote={quote} />
        <button onClick={getRandomQuote}>Get New Quote</button>
      </header>
    </div>
  );
}

export default App;
