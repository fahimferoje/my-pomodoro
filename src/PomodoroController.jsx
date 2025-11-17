import Timer from "./Timer";
import { useState } from "react";
import React from "react";
import Tabs from "./Tabs";

export const Mode = Object.freeze({
  POMODORO: { id: 0, name: "Pomodoro", time: 3, color: "bg-red-300" },
  SHORT_BREAK: { id: 1, name: "Short Break", time: 2, color: "bg-teal-600" },
  LONG_BREAK: { id: 2, name: "Long Break", time: 5, color: "bg-cyan-700" },
});

const POMODORO_SESSION_COUNT = 3;

const PomodoroController = () => {
  const [mode, setMode] = useState(Mode.POMODORO);
  const [pomodoroSessionCount, setPomodoroSessionCount] = useState(1);
  const [active, setActive] = useState(Mode.POMODORO.id);

  const onComplete = () => {
    if (pomodoroSessionCount === POMODORO_SESSION_COUNT) {
      setMode(Mode.LONG_BREAK);
      setActive(Mode.LONG_BREAK.id);
      setPomodoroSessionCount(1);
      return;
    }

    if (mode === Mode.POMODORO) {
      setMode(Mode.SHORT_BREAK);
      setActive(Mode.SHORT_BREAK.id);
    } else if (mode === Mode.SHORT_BREAK) {
      setPomodoroSessionCount((prev) => prev + 1);
      setMode(Mode.POMODORO);
      setActive(Mode.POMODORO.id);
    } else {
      setMode(Mode.POMODORO);
      setActive(Mode.POMODORO.id);
    }
  };

  return (
    <div className="flex justify-center min-h-screen bg-red-400 text-white">
      <div className="bg-red-300 w-md h-64 mt-30">
        <div className=" text-white flex flex-col items-center pt-6">
          <Tabs active={active} mode={mode} setActive={setActive} />
        </div>
        <div className="text-white flex flex-col items-center pt-3">
          <Timer
            mode={mode}
            pomodoroSessionCount={pomodoroSessionCount}
            onComplete={onComplete}
          />
        </div>
      </div>
    </div>
  );
};

export default PomodoroController;
