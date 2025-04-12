import React from 'react';

const Quote = ({ quote }) => {
  return (
    <div className="quote-box">
      <blockquote>{quote}</blockquote>
    </div>
  );
};

export default Quote;
