import { Mode } from "../constants/PomodoroMode.js";
import { useState } from "react";

const MAX_POMODORO_SESSION_COUNT = 3;

export const usePomodoroTimer = (activeTask, setActiveTask, setTasksList) => {
  const { POMODORO, SHORT_BREAK, LONG_BREAK } = Mode;

  const [timerMode, setTimerMode] = useState(POMODORO);

  const [pomodoroSessionCount, setPomodoroSessionCount] = useState(1);

  const onComplete = () => {
    if (pomodoroSessionCount === MAX_POMODORO_SESSION_COUNT) {
      setTimerMode(LONG_BREAK);
      setPomodoroSessionCount(1);
      return;
    }

    if (timerMode === POMODORO) {
      setTimerMode(SHORT_BREAK);

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
      if (timerMode === SHORT_BREAK) {
        setPomodoroSessionCount((prev) => prev + 1);
      }

      setTimerMode(POMODORO);
    }
  };

  const onTabClick = (mode) => {
    setTimerMode(mode);
  };

  return {
    onComplete,
    onTabClick,
    pomodoroSessionCount,
    timerMode,
  };
};
