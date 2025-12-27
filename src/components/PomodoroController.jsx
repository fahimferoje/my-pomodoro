import Timer from "./Timer";
import { useState } from "react";
import Tabs from "./Tabs";
import PomodoroSessionCount from "./PomodoroSessionCount";
import Tasks from "../components/tasks/Tasks";
import { useTasks } from "../components/hooks/useTasks.js";
import { Mode } from "../components/constants/PomodoroMode.js";

const MAX_POMODORO_SESSION_COUNT = 3;

const PomodoroController = () => {
  const { POMODORO, SHORT_BREAK, LONG_BREAK } = Mode;

  const [timerMode, setTimerMode] = useState({
    mode: POMODORO,
    active: POMODORO.id,
    themeColor: POMODORO.typography.themeColor,
  });

  const [pomodoroSessionCount, setPomodoroSessionCount] = useState(1);

  const {
    taskTitleHeading,
    tasksList,
    taskRowData,
    setTaskRowData,
    showAddTaskUIComponent,
    activeTask,
    setActiveTask,
    onAddTaskButtonClick,
    onCancel,
    onSave,
    onInputValueChange,
    onTaskCheck,
    onTaskNameClick,
    setTasksList,
  } = useTasks();

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

  return (
    <div
      className={`flex items-center min-h-dvh flex-col ${timerMode.themeColor} `}
    >
      <div className={`bg-white/15 rounded-lg w-md h-80 mt-30 text-white`}>
        <div className="flex flex-col pt-6">
          <Tabs active={timerMode.active} onTabClick={onTabClick} />
        </div>
        <div className="flex flex-col pt-3">
          <Timer mode={timerMode.mode} onComplete={onComplete} />
        </div>
      </div>
      <div className="flex items-center flex-col text-white mt-5">
        <PomodoroSessionCount pomodoroSessionCount={pomodoroSessionCount} />
        {/* <TaskName /> */}
      </div>
      <div>
        <Tasks
          taskTitleHeading={taskTitleHeading}
          tasksList={tasksList}
          showAddTaskUIComponent={showAddTaskUIComponent}
          taskRowData={taskRowData}
          onTaskCheck={onTaskCheck}
          onTaskNameClick={onTaskNameClick}
          setTaskRowData={setTaskRowData}
          onAddTaskButtonClick={onAddTaskButtonClick}
          onSave={onSave}
          onCancel={onCancel}
          onInputValueChange={onInputValueChange}
        />
      </div>
    </div>
  );
};

export default PomodoroController;
