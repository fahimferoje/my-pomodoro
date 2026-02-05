import { useState, useEffect, useCallback } from "react";
import { getActiveTask, updateActiveTask } from "../../db/indexedDb.js";
import { Mode } from "../constants/PomodoroMode.js";
import { getStageSeconds, getLongBreakInterval } from "../../db/indexedDb.js";

export const usePomodoroTimer = () => {
  const [tasksList, setTasksList] = useState([]);

  const { POMODORO, SHORT_BREAK, LONG_BREAK } = Mode;

  const [timerMode, setTimerMode] = useState(POMODORO);

  const [stageSeconds, setStageSeconds] = useState(null);

  const [longBreakInterval, setLongBreakInterval] = useState(4);

  const [progressBarValue, setProgressBarValue] = useState(0);

  useEffect(() => {
    const fetchStageSeconds = async () => {
      try {
        const [stageSecRes, longIntervalRes] = await Promise.all([
          getStageSeconds(),
          getLongBreakInterval(),
        ]);
        setStageSeconds(stageSecRes.length !== 0 ? stageSecRes : [1, 10, 1]);
        setLongBreakInterval(longIntervalRes ? longIntervalRes : 4);
      } catch (err) {
        console.log(err);
      }
    };

    fetchStageSeconds();
  }, []);

  const [totalCompletedPomodoros, setTotalCompletedPomodoros] = useState(1);

  const [completedPomodoros, setCompletedPomodoros] = useState(1);

  const onComplete = async () => {
    if (completedPomodoros % longBreakInterval === 0) {
      setTimerMode(LONG_BREAK);
      setCompletedPomodoros(1);
      return;
    }

    if (timerMode === POMODORO) {
      setTimerMode(SHORT_BREAK);

      const activeTask = await getActiveTask();

      setTasksList((prevList) => {
        if (!activeTask) {
          return prevList;
        }

        let updatedTask = null;

        const updatedList = prevList.map((task) => {
          if (task.id === activeTask.id) {
            updatedTask = {
              ...task,
              localPomodoroSessionCount: task.localPomodoroSessionCount + 1,
            };
            return updatedTask;
          }
          return task;
        });
        if (updatedTask) {
          updateActiveTask(updatedTask);
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

  const onTabClick = useCallback((mode) => {
    setTimerMode(mode);
  }, []);

  return {
    tasksList,
    setTasksList,
    stageSeconds,
    setStageSeconds,
    timerMode,
    longBreakInterval,
    setLongBreakInterval,
    progressBarValue,
    setProgressBarValue,
    onComplete,
    onTabClick,
    totalCompletedPomodoros,
  };
};
