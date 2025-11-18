import Timer from "./Timer";
import { useState } from "react";
import React from "react";
import Tabs from "./Tabs";

export const Mode = Object.freeze({
  POMODORO: {
    id: 0,
    name: "Pomodoro",
    time: 3,
    typography: { themeColor: "bg-red-400", fontColor: "text-red-400" },
  },
  SHORT_BREAK: {
    id: 1,
    name: "Short Break",
    time: 2,
    typography: { themeColor: "bg-teal-600", fontColor: "text-teal-600" },
  },
  LONG_BREAK: {
    id: 2,
    name: "Long Break",
    time: 5,
    typography: { themeColor: "bg-cyan-700", fontColor: "text-cyan-700" },
  },
});

const POMODORO_SESSION_COUNT = 3;

const PomodoroController = () => {
  const [mode, setMode] = useState(Mode.POMODORO);
  const [pomodoroSessionCount, setPomodoroSessionCount] = useState(1);
  const [active, setActive] = useState(Mode.POMODORO.id);
  const [themeColor, setThemeColor] = useState(
    Mode.POMODORO.typography.themeColor
  );

  const onComplete = () => {
    if (pomodoroSessionCount === POMODORO_SESSION_COUNT) {
      setMode(Mode.LONG_BREAK);
      setActive(Mode.LONG_BREAK.id);
      setThemeColor(Mode.LONG_BREAK.typography.themeColor);
      setPomodoroSessionCount(1);
      return;
    }

    if (mode === Mode.POMODORO) {
      setMode(Mode.SHORT_BREAK);
      setActive(Mode.SHORT_BREAK.id);
      setThemeColor(Mode.SHORT_BREAK.typography.themeColor);
    } else if (mode === Mode.SHORT_BREAK) {
      setPomodoroSessionCount((prev) => prev + 1);
      setMode(Mode.POMODORO);
      setActive(Mode.POMODORO.id);
      setThemeColor(Mode.POMODORO.typography.themeColor);
    } else {
      setMode(Mode.POMODORO);
      setActive(Mode.POMODORO.id);
      setThemeColor(Mode.POMODORO.typography.themeColor);
    }
  };

  return (
    <div className={`flex justify-center min-h-screen ${themeColor} `}>
      <div className={`bg-white/15 rounded-lg w-md h-80 mt-30 text-white`}>
        <div className="flex flex-col items-center pt-6">
          <Tabs active={active} mode={mode} setActive={setActive} />
        </div>
        <div className="flex flex-col items-center pt-3">
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
