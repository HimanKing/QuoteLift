import React from 'react';
import './Quote.css';

const Quote = ({ quote }) => {
  return (
    <div className="quote-container">
      <div className="quote-box">
        <blockquote className="quote-text">"{quote}"</blockquote>
      </div>
    </div>
  );
};

export default Quote;
