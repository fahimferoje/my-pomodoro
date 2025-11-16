import Timer from "./Timer";
import { useState } from "react";
import React from "react";

export const Mode = Object.freeze({
  POMODORO: { name: "Pomodoro", time: 3 },
  SHORT_BREAK: { name: "Short Break", time: 2 },
  LONG_BREAK: { name: "Long Break", time: 5 },
});

const POMODORO_SESSION_COUNT = 3;

const PomodoroController = () => {
  const [mode, setMode] = useState(Mode.POMODORO);
  const [pomodoroSessionCount, setPomodoroSessionCount] = useState(1);

  const onComplete = () => {
    if (pomodoroSessionCount === POMODORO_SESSION_COUNT) {
      setMode(Mode.LONG_BREAK);
      setPomodoroSessionCount(1);
      return;
    }

    if (mode === Mode.POMODORO) {
      setMode(Mode.SHORT_BREAK);
    } else if (mode === Mode.SHORT_BREAK) {
      setPomodoroSessionCount((prev) => prev + 1);
      setMode(Mode.POMODORO);
    } else {
      setMode(Mode.POMODORO);
    }
  };

  return (
    <div className="flex justify-center min-h-screen bg-red-400 text-white">
      <div className="bg-red-300 w-md h-64 mt-30">
        <Timer
          mode={mode}
          pomodoroSessionCount={pomodoroSessionCount}
          onComplete={onComplete}
        />
      </div>
    </div>
  );
};

export default PomodoroController;
