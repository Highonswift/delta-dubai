// hooks/useTypingEffect.ts
'use client';

import { useState, useEffect } from 'react';

// Added basic types for the function parameters
export const useTypingEffect = (
  textsToType: string[],
  typeSpeed: number = 100,
  deleteSpeed: number = 50,
  pauseTime: number = 2000
): string => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % textsToType.length;
      const fullText = textsToType[i];

      if (isDeleting) {
        setText(fullText.substring(0, text.length - 1));
      } else {
        setText(fullText.substring(0, text.length + 1));
      }

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), pauseTime);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const typingInterval = isDeleting ? deleteSpeed : typeSpeed;
    const timer = setTimeout(handleTyping, typingInterval);

    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, textsToType, typeSpeed, deleteSpeed, pauseTime]);

  return text;
};