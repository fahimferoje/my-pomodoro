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

  const [timerMode, setTimerMode] = useState({
    mode: POMODORO,
    active: POMODORO.id,
    themeColor: POMODORO.typography.themeColor,
  });

  const [pomodoroSessionCount, setPomodoroSessionCount] = useState(1);

  const onComplete = () => {
    if (pomodoroSessionCount === MAX_POMODORO_SESSION_COUNT) {
      setTimerMode({
        mode: LONG_BREAK,
        active: LONG_BREAK.id,
        themeColor: LONG_BREAK.typography.themeColor,
      });
      setPomodoroSessionCount(1);
      return;
    }

    if (timerMode.mode === POMODORO) {
      setTimerMode({
        mode: SHORT_BREAK,
        active: SHORT_BREAK.id,
        themeColor: SHORT_BREAK.typography.themeColor,
      });
    } else {
      if (timerMode.mode === SHORT_BREAK) {
        setPomodoroSessionCount((prev) => prev + 1);
      }

      setTimerMode({
        mode: POMODORO,
        active: POMODORO.id,
        themeColor: POMODORO.typography.themeColor,
      });
    }
  };

  const onTabClick = (mode) => {
    setTimerMode({
      mode: mode,
      active: mode.id,
      themeColor: mode.typography.themeColor,
    });
  };

  return (
    <div
      className={`flex justify-center min-h-screen ${timerMode.themeColor} `}
    >
      <div className={`bg-white/15 rounded-lg w-md h-80 mt-30 text-white`}>
        <div className="flex flex-col items-center pt-6">
          <Tabs active={timerMode.active} onTabClick={onTabClick} />
        </div>
        <div className="flex flex-col items-center pt-3">
          <Timer
            mode={timerMode.mode}
            pomodoroSessionCount={pomodoroSessionCount}
            onComplete={onComplete}
          />
        </div>
      </div>
    </div>
  );
};

export default PomodoroController;
