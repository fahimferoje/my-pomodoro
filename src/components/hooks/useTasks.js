import { useState } from "react";
import { getRandomInt } from "../constants/RandomIntGenerator";
import { PopUpMode } from "../constants/AddTaskPopUpMode";

export const useTasks = () => {
  const [taskRowData, setTaskRowData] = useState({
    key: null,
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

  const [showAddTaskButton, setShowAddTaskButton] = useState(true);

  const { ADD, EDIT } = PopUpMode;
  const [addTaskPopUpMode, setAddTaskPopUpMode] = useState({
    mode: null,
    taskRowId: null,
    show: false,
  });

  const onAddTaskButtonClick = () => {
    setShowAddTaskButton(false);

    setAddTaskPopUpMode((prevState) => {
      return {
        ...prevState,
        mode: ADD,
        show: true,
      };
    });

    setTaskRowData({
      key: null,
      taskName: "",
      checked: false,
      iconBgColor: "",
      textDecoration: "",
      estimatedPomodoroCount: 1,
      localPomodoroSessionCount: 0,
    });
  };

  const onCancel = () => {
    setShowAddTaskButton(true);
    setAddTaskPopUpMode((prev) => {
      return {
        ...prev,
        show: false,
      };
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

    //edit mode
    if (
      addTaskPopUpMode.mode === EDIT &&
      taskRowData.key &&
      tasksList.length !== 0
    ) {
      const updatedTask = { ...taskRowData };

      const updatedTasks = tasksList.map((task) =>
        task.key === taskRowData.key ? updatedTask : task
      );

      setTasksList(updatedTasks);
      setTaskTitleHeading(updatedTask.taskName);
      setActiveTask(updatedTask);

      setAddTaskPopUpMode((prev) => {
        return {
          ...prev,
          show: false,
        };
      });

      return;
    }

    setTasksList([
      ...tasksList,
      {
        key: getRandomInt(),
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

  const onTaskEdit = (task) => {
    if (addTaskPopUpMode.show) {
      setAddTaskPopUpMode((prev) => {
        return {
          ...prev,
          show: false,
        };
      });
    }

    setAddTaskPopUpMode({ mode: EDIT, taskRowId: task.key, show: true });

    setTaskRowData(task);
    setShowAddTaskButton(true);
  };

  return {
    taskTitleHeading,
    tasksList,
    taskRowData,
    activeTask,
    setTaskRowData,
    setActiveTask,
    onAddTaskButtonClick,
    onCancel,
    onSave,
    onInputValueChange,
    onTaskCheck,
    onTaskNameClick,
    setTasksList,
    onTaskEdit,
    addTaskPopUpMode,
    showAddTaskButton,
  };
};
