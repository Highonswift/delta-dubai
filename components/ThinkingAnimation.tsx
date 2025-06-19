// components/ThinkingAnimation.tsx

'use client'; // <-- Mark as a Client Component

import { useState, useEffect } from 'react';
import Image from 'next/image';
import './ThinkingAnimation.css';

const PHRASES = [
  "Hi! This is Delta Dubai",
  "Hello, I need help with moving my car.",
  "We offer top vehicle transport",
  "Thats great !",
];
const TYPING_SPEED = 100;
const DELETING_SPEED = 50;
const DELAY_BETWEEN_PHRASES = 2000;
const CONVERSATION_START_DELAY = 2500;

declare global {
  interface Window {
    Trata?: { chatWidget?: { init: (config: any) => { render: () => void }; }; };
    trataConfig?: any;
  }
}

export default function ThinkingAnimation() {
  const [displayText, setDisplayText] = useState<string>('');
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [phraseIndex, setPhraseIndex] = useState<number>(0);
  const [currentSpeaker, setCurrentSpeaker] = useState<'person1' | 'person2'>('person1');
  const [conversationStarted, setConversationStarted] = useState<boolean>(false);

  useEffect(() => { /* ...useEffect logic is identical to the previous answer... */
    const startTimer = setTimeout(() => { setConversationStarted(true); }, CONVERSATION_START_DELAY);
    return () => clearTimeout(startTimer);
  }, []);

  useEffect(() => { /* ...useEffect logic is identical to the previous answer... */
    if (!conversationStarted) return;
    let timeoutId: NodeJS.Timeout;
    if (!isDeleting) {
      if (displayText.length < PHRASES[phraseIndex].length) {
        timeoutId = setTimeout(() => setDisplayText(PHRASES[phraseIndex].substring(0, displayText.length + 1)), TYPING_SPEED);
      } else {
        timeoutId = setTimeout(() => setIsDeleting(true), DELAY_BETWEEN_PHRASES);
      }
    } else {
      if (displayText.length > 0) {
        timeoutId = setTimeout(() => setDisplayText(PHRASES[phraseIndex].substring(0, displayText.length - 1)), DELETING_SPEED);
      } else {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % PHRASES.length);
        setCurrentSpeaker((prev) => (prev === 'person1' ? 'person2' : 'person1'));
      }
    }
    return () => clearTimeout(timeoutId);
  }, [displayText, isDeleting, phraseIndex, conversationStarted]);

  const handleChatClick = () => { /* ...handleChatClick logic is identical... */
    if (window.Trata?.chatWidget?.init) {
      const openConfig = { ...window.trataConfig, isOpen: true };
      const widgetInstance = window.Trata.chatWidget.init(openConfig);
      widgetInstance.render();
    } else {
      console.error('Trata widget core is not ready.');
      alert('Chat is still loading, please wait!');
    }
  };

  return (
    <div className="thinking-container">
      <div className="prompt-text">SPEAK NOW</div>
      <button className="thought-bubble" onClick={handleChatClick}>
        {displayText}<span className="cursor"></span>
      </button>
      <div className="people-container">
        <Image src="/images/personleft.png" alt="Person 1" width={85} height={85} className="person person-1" />
        {conversationStarted && (
          <>
            <div className={`bubble-trail left ${currentSpeaker === 'person1' ? 'active' : ''}`}></div>
            <div className={`bubble-trail right ${currentSpeaker === 'person2' ? 'active' : ''}`}></div>
          </>
        )}
        <Image src="/images/personright.png" alt="Person 2" width={85} height={85} className="person person-2" />
      </div>
    </div>
  );
}