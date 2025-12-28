import { Mode } from "../constants/PomodoroMode.js";
import { useState } from "react";

const MAX_POMODORO_SESSION_COUNT = 3;

export const usePomodoroTimer = () => {
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

      setTasksList((prevList) => {
        let updatedTask;

        const updatedList = prevList.map((task) => {
          if (task.taskName === activeTask.taskName) {
            updatedTask = {
              ...task,
              localPomodoroSessionCount: task.localPomodoroSessionCount + 1,
            };

            return updatedTask;
          }
          return task;
        });
        setActiveTask(updatedTask);
        return updatedList;
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

  return {
    onComplete,
    onTabClick,
    pomodoroSessionCount,
    timerMode,
  };
};
