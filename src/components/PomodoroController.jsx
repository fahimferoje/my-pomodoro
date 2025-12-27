import Timer from "./Timer";
import { useState } from "react";
import Tabs from "./Tabs";
import PomodoroSessionCount from "./PomodoroSessionCount";
import Tasks from "../components/tasks/Tasks";

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

  const [taskRowData, setTaskRowData] = useState({
    taskName: "",
    checked: false,
    iconBgColor: "",
    textDecoration: "",
    estimatedPomodoroCount: 1,
    localPomodoroSessionCount: 0,
  });

  const [tasksList, setTasksList] = useState([]);

  const [taskTitleHeading, setTaskTitleHeading] = useState("Time to focus!");
  const [activeTask, setActiveTask] = useState(null);

  const [showAddTaskUIComponent, setShowAddTaskUIComponent] = useState({
    showAddTaskPopUp: false,
    showAddTaskButton: true,
  });

  const onAddTaskButtonClick = () => {
    setShowAddTaskUIComponent({
      showAddTaskPopUp: true,
      showAddTaskButton: false,
    });

    setTaskRowData((prevState) => {
      return {
        ...prevState,
        taskName: "",
      };
    });
  };

  const onCancel = () => {
    setShowAddTaskUIComponent({
      showAddTaskPopUp: false,
      showAddTaskButton: true,
    });

    setTaskRowData((prevState) => {
      return {
        ...prevState,
        taskName: "",
        estimatedPomodoroCount: 1,
      };
    });
  };

  const onSave = () => {
    if (!taskRowData.taskName) {
      return;
    }

    if (activeTask === null) {
      setTaskTitleHeading(taskRowData.taskName);
      setActiveTask(taskRowData);
    }

    setTasksList([
      ...tasksList,
      {
        taskName: taskRowData.taskName,
        estimatedPomodoroCount: taskRowData.estimatedPomodoroCount,
        localPomodoroSessionCount: taskRowData.localPomodoroSessionCount,
      },
    ]);

    setTaskRowData((prevState) => {
      return {
        ...prevState,
        taskName: "",
        estimatedPomodoroCount: 1,
      };
    });
  };

  const onInputValueChange = (e) => {
    setTaskRowData((prevState) => {
      return {
        ...prevState,
        taskName: e.target.value,
      };
    });
  };

  const onTaskCheck = () => {
    setTaskRowData((prevState) => {
      return {
        ...prevState,
        checked: !prevState.checked,
        iconBgColor: prevState.checked ? "" : "text-red-400",
        textDecoration: prevState.checked ? "" : "line-through",
      };
    });
  };

  const onTaskNameClick = (task) => {
    setTaskTitleHeading(task.taskName);
    setActiveTask(task);
  };

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
          onTaskCheck={onTaskCheck}
          onTaskNameClick={onTaskNameClick}
          taskRowData={taskRowData}
          setTaskRowData={setTaskRowData}
          showAddTaskUIComponent={showAddTaskUIComponent}
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
