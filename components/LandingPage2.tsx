// components/LandingPage2.tsx
'use client';

import React from 'react';
import '../styles/LandingPage2.css';

function LandingPage2() {
  return (
    <div className="page-wrapper page-2">
      <div className="landing-container">
        <h1 className="background-text">DELTA DUBAI</h1>
        <img
          src="/assets/images/object.png" // Updated path
          alt="Main visual object"
          className="middle-image"
        />
        <h2 className="foreground-text">Guess what’s arriving soon. No, really—guess!</h2>
        <button className="button">
          <img
            src="/assets/images/support.png" // Updated path
            alt="Support Agent"
            className="agent-icon"
          />
          Chat with us
        </button>
      </div>
    </div>
  );
}
export default LandingPage2;