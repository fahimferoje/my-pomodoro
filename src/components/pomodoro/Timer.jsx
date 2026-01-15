import { useCountDownTimer } from "../hooks/useCountDownTimer.js";

const Timer = ({ mode, onComplete }) => {
  const { timeLeft, toggleTimer, isRunning } = useCountDownTimer(
    mode,
    onComplete
  );

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
    </div>
  );
};

export default Timer;
