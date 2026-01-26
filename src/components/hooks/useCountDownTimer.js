import { useState, useRef, useEffect } from "react";

export const useCountDownTimer = (stageSeconds, mode, onComplete) => {
  const [timeLeft, setTimeLeft] = useState(stageSeconds[mode.id]);
  const [isRunning, setIsRunning] = useState(false);

  const timerRef = useRef(null);

  const isTimerFinishedRef = useRef(false);

  useEffect(() => {
    if (timeLeft === 0 && !isTimerFinishedRef.current) {
      isTimerFinishedRef.current = true;
      clearInterval(timerRef.current);
      onComplete();
    }
  }, [timeLeft]);

  useEffect(() => {
    isTimerFinishedRef.current = false;
    clearInterval(timerRef.current);
    setTimeLeft(stageSeconds[mode.id]);
    setIsRunning(false);
  }, [mode]);

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  const toggleTimer = () => {
    if (isRunning) {
      clearInterval(timerRef.current);
      setIsRunning(false);
    } else {
      if (timerRef.current) {
        return;
      }
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
