// components/LandingPage3.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useTypingEffect } from '../hooks/useTypingEffect';
import '../styles/LandingPage3.css'; // Ensure you have the correct path to your CSS file
function LandingPage3() {
  const [isWidgetVisible, setWidgetVisible] = useState(false);

  const toggleWidget = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault(); // Prevent navigation for '#' link
    setWidgetVisible(prevState => !prevState);
  };
  
  const animatedText = useTypingEffect(
    ["You’ve never seen anything like this. But you will!"],
    100,
    75
  );

  return (
    <>
      <div className="page-wrapper page-3">
        {/*<a href="#" onClick={toggleWidget} className="floating-agent-button-lp3">
          <img
            src="/assets/images/support.png" // Updated path
            alt="Support Agent"
            className="agent-icon"
          />
        </a>*/}
        <div className="video-page-container">
          <video
            className="background-video"
            src="/assets/car.mp4" // Updated path
            autoPlay
            loop
            muted
            playsInline // Good practice for mobile
          />
          <div className="content-overlay">
            <h1 className="headd">Delta Dubai </h1>
            <p className="typing-text">{animatedText}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingPage3;