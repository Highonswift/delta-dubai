
'use client';
import React from 'react';
import Image from 'next/image';
import LeftNavbar from '../components/LeftNavbar';
import ThinkingAnimation from '../components/ThinkingAnimation';
import '../styles/LandingPage4.css';

export default function LandingPage4() {
  return (
    <div className="landing-page">
      <Image
        src="/assets/images/bgimg22.png"
        alt="A beautiful descriptive background"
        fill
        priority
        sizes="100vw"
        className="object-cover -z-10"
      />
      <LeftNavbar />
      <h1 className="title">DELTA</h1>
      <h1 className="title2">DUBAI</h1>
      
      {/* This div is the parent container that MUST have a size defined in your CSS 
      <div className="car-image">
        <Image 
          src='/assets/images/overlay.png' 
          alt="A car with a container" 
          fill={true}
          style={{ objectFit: 'contain' }} // This ensures the image fits inside the container without being cropped
          priority={true}
        />
      </div>*/}

      <div className="thinkanim">
        <ThinkingAnimation />
      </div>
    </div>
  );
}