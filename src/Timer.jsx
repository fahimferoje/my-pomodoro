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

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-8xl font-bold">
        {Math.floor(timeLeft / 60)
          .toString()
          .padStart(2, "0")}
        :{(timeLeft % 60).toString().padStart(2, "0")}
      </h1>
      <button
        className={`bg-white w-40 ${mode.typography.fontColor} 
         p-3 rounded-md font-bold mt-6 text-xl`}
        onClick={toggleTimer}
      >
        {isRunning ? "PAUSE" : "START"}
      </button>
      <p>{`Session Count: ${pomodoroSessionCount}`}</p>
    </div>
  );
};

export default Timer;
