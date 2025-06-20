//src/components/VersionSwitcher.jsx
'use client';
import React from 'react';
import '../styles/VersionSwitcher.css';
interface VersionSwitcherProps {
  activeVersion: number;
  onSwitch: (version: number) => void;
}
const VersionSwitcher: React.FC<VersionSwitcherProps> = ({ activeVersion, onSwitch }) => {
  return (
    <div className="version-switcher">
      <button
        className={activeVersion === 1 ? 'active' : ''}
        onClick={() => onSwitch(1)}
      >
        Version 1
      </button>
      <button
        className={activeVersion === 2 ? 'active' : ''}
        onClick={() => onSwitch(2)}
      >
        Version 2
      </button>
      <button
        className={activeVersion === 3 ? 'active' : ''}
        onClick={() => onSwitch(3)}
      >
        Version 3
      </button>
      <button
        className={activeVersion === 4 ? 'active' : ''}
        onClick={() => onSwitch(4)}
      >
        Version 4
      </button>
    </div>
  );
};

export default VersionSwitcher;