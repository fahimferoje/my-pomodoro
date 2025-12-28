import { useState, useRef, useEffect } from "react";

export const useTimer = (mode, onComplete) => {
  const [timeLeft, setTimeLeft] = useState(mode.time);
  const [isRunning, setIsRunning] = useState(false);

  const timerRef = useRef(null);

  useEffect(() => {
    if (timeLeft === 0) {
      clearInterval(timerRef.current);
      onComplete();
    }
  }, [timeLeft]);

  useEffect(() => {
    clearInterval(timerRef.current);
    setTimeLeft(mode.time);
    setIsRunning(false);
  }, [mode]);

  const toggleTimer = () => {
    if (isRunning) {
      clearInterval(timerRef.current);
      setIsRunning(false);
    } else {
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTimeLeft) => {
          if (prevTimeLeft <= 1) {
            clearInterval(timerRef.current);
            timerRef.current = null;
            return 0;
          }
          return prevTimeLeft - 1;
        });
      }, 1000);
      setIsRunning(true);
    }
  };

  return { timeLeft, toggleTimer, isRunning };
};
