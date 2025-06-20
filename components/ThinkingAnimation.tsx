// components/ThinkingAnimation.tsx
'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
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

  useEffect(() => {
    const startTimer = setTimeout(() => { setConversationStarted(true); }, CONVERSATION_START_DELAY);
    return () => clearTimeout(startTimer);
  }, []);

  useEffect(() => { 
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

  const handleChatClick = () => { 
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
    <div className="flex flex-col items-center gap-[15px]">
      <div className="font-['Helvetica'] text-[0.9rem] font-medium text-[#ccc]">
        SPEAK NOW
      </div>
      <button 
        className="border-2 border-[#00fffb] bg-transparent text-white rounded-[15px] px-5 py-3 min-w-[280px] min-h-[25px] text-center font-['Helvetica'] text-[0.9rem] font-medium"
        onClick={handleChatClick}
      >
        {displayText}
        <span className="inline-block bg-white w-2 h-[1rem] ml-[3px] align-middle animate-blink"></span>
      </button>
      <div className="relative flex justify-between w-[350px] mt-[10px]">
        <Image src="/images/personleft.png" alt="Person 1" width={85} height={85} className="w-[85px] h-auto" />
        {conversationStarted && (
          <>
            <div className={`
              absolute top-[-20px] left-[60px]
              transition-opacity duration-300 ease-in-out
              ${currentSpeaker === 'person1' ? 'opacity-100' : 'opacity-0'}
              before:content-[''] before:block before:bg-white before:rounded-full
              before:w-[10px] before:h-[10px] before:absolute before:top-0 before:left-0
              after:content-[''] after:block after:bg-white after:rounded-full
              after:w-[6px] after:h-[6px] after:absolute after:top-[15px] after:left-[-10px]
            `}></div>
            <div className={`
              absolute top-[-20px] right-[60px]
              transition-opacity duration-300 ease-in-out
              ${currentSpeaker === 'person2' ? 'opacity-100' : 'opacity-0'}
              before:content-[''] before:block before:bg-white before:rounded-full
              before:w-[10px] before:h-[10px] before:absolute before:top-0 before:right-0
              after:content-[''] after:block after:bg-white after:rounded-full
              after:w-[6px] after:h-[6px] after:absolute after:top-[15px] after:right-[-10px]
            `}></div>
          </>
        )}
        <Image src="/images/personright.png" alt="Person 2" width={85} height={85} className="w-[85px] h-auto" />
      </div>
    </div>
  );
}