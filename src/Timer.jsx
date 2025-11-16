import { useState, useRef, useEffect } from "react";

const Timer = ({ mode, pomodoroSessionCount, onComplete }) => {
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

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div>
      <h1>{mode.name}</h1>
      <h1>
        {minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
      </h1>
      <button onClick={toggleTimer}>{isRunning ? "Pause" : "Start"}</button>
      <p>{`Session Count: ${pomodoroSessionCount}`}</p>
    </div>
  );
};

export default Timer;
