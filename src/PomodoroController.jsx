import Timer from "./Timer";
import { useState } from "react";
import Tabs from "./Tabs";

export const Mode = Object.freeze({
  POMODORO: {
    id: 0,
    name: "Pomodoro",
    time: 5,
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

const MAX_POMODORO_SESSION_COUNT = 3;

const PomodoroController = () => {
  const { POMODORO, SHORT_BREAK, LONG_BREAK } = Mode;

  const [mode, setMode] = useState(POMODORO);
  const [pomodoroSessionCount, setPomodoroSessionCount] = useState(1);
  const [active, setActive] = useState(POMODORO.id);
  const [themeColor, setThemeColor] = useState(POMODORO.typography.themeColor);

  const onComplete = () => {
    if (pomodoroSessionCount === MAX_POMODORO_SESSION_COUNT) {
      setMode(LONG_BREAK);
      setActive(LONG_BREAK.id);
      setThemeColor(LONG_BREAK.typography.themeColor);
      setPomodoroSessionCount(1);
      return;
    }

    if (mode === POMODORO) {
      setMode(SHORT_BREAK);
      setActive(SHORT_BREAK.id);
      setThemeColor(SHORT_BREAK.typography.themeColor);
    } else {
      if (mode === SHORT_BREAK) {
        setPomodoroSessionCount((prev) => prev + 1);
      }
      setMode(POMODORO);
      setActive(POMODORO.id);
      setThemeColor(POMODORO.typography.themeColor);
    }
  };

  const onTabClick = (mode) => {
    setActive(mode.id);
    setMode(mode);
    setThemeColor(mode.typography.themeColor);
  };

  return (
    <div className={`flex justify-center min-h-screen ${themeColor} `}>
      <div className={`bg-white/15 rounded-lg w-md h-80 mt-30 text-white`}>
        <div className="flex flex-col items-center pt-6">
          <Tabs active={active} onTabClick={onTabClick} setActive={setActive} />
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
