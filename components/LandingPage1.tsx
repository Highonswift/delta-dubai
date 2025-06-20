// components/LandingPage1.tsx
'use client';
import React, { useState, useEffect } from 'react';
import '../styles/LandingPage1.css';

const LandingPage1 = () => {
  const [isIntroActive, setIntroActive] = useState(true);
  const [isContentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIntroActive(false);
      setContentVisible(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="page-wrapper page-1">
      <div
        className="landing-container"
        style={{ backgroundImage: `url(/assets/images/layer-1-background.png)` }}
      >
        {isIntroActive && <div className="intro-overlay"></div>}
        <div className={`content-layer ${isContentVisible ? 'visible' : ''}`}>
          <h2>DELTA DUBAI</h2>
          <p>Something awesome is on its way!</p>
        </div>
      </div>
      {/*<a href="#" className="floating-agent-button">
        <span className="chat-bubble">Chat with us</span>
        <img
          src="/assets/images/support.png" // Updated path
          alt="Support Agent"
          className="agent-icon"
        />
      </a>*/}
    </div>
  );
};

export default LandingPage1;