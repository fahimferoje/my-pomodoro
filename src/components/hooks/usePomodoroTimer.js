import { Mode } from "../constants/PomodoroMode.js";
import { useState } from "react";

const MAX_POMODORO_SESSION_COUNT = 3;

export const usePomodoroTimer = (activeTask, setActiveTask, setTasksList) => {
  const { POMODORO, SHORT_BREAK, LONG_BREAK } = Mode;

  const [timerMode, setTimerMode] = useState(POMODORO);

  const [totalCompletedPomodoros, setTotalCompletedPomodoros] = useState(1);

  const [completedPomodoros, setCompletedPomodoros] = useState(1);

  const onComplete = () => {
    if (completedPomodoros % MAX_POMODORO_SESSION_COUNT === 0) {
      setTimerMode(LONG_BREAK);
      setCompletedPomodoros(1);
      return;
    }

    if (timerMode === POMODORO) {
      setTimerMode(SHORT_BREAK);

      setTasksList((prevList) => {
        if (!activeTask) {
          return prevList;
        }

        let updatedTask = null;

        const updatedList = prevList.map((task) => {
          if (task.key === activeTask.key) {
            updatedTask = {
              ...task,
              localPomodoroSessionCount: task.localPomodoroSessionCount + 1,
            };
            return updatedTask;
          }
          return task;
        });
        if (updatedTask) {
          setActiveTask(updatedTask);
        }
        return updatedList;
      });
    } else {
      if (timerMode === SHORT_BREAK) {
        setTotalCompletedPomodoros((prev) => prev + 1);
        setCompletedPomodoros((prev) => prev + 1);
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
    totalCompletedPomodoros,
    timerMode,
  };
};
