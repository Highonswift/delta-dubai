// app/page.tsx
'use client'; // This is the main controller, so it must be a client component

import { useState } from 'react';
import LandingPage1 from '../components/LandingPage1';
import LandingPage2 from '../components/LandingPage2';
import LandingPage3 from '../components/LandingPage3';
import LandingPage4 from "../components/LandingPage4";
import VersionSwitcher from '../components/VersionSwitcher';

export default function Home() {
  // This state controls which version is active
  const [activeVersion, setActiveVersion] = useState(1);

  return (
    <main>
      <VersionSwitcher 
        activeVersion={activeVersion} 
        onSwitch={setActiveVersion} 
      />
      <div className="page-content">
        {/* Conditionally render the active landing page */}
        {activeVersion === 1 && <LandingPage1 />}
        {activeVersion === 2 && <LandingPage2 />}
        {activeVersion === 3 && <LandingPage3 />}
        {activeVersion === 4 && <LandingPage4 />}
      </div>
    </main>
  );
}