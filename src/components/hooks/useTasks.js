import { useState, useRef, useEffect } from "react";
import { getRandomInt } from "../constants/RandomIntGenerator";
import { PopUpMode } from "../constants/AddTaskPopUpMode";
import { addTask, getAllTasks } from "../../db/indexedDb.js";

export const useTasks = () => {
  const [taskRowData, setTaskRowData] = useState({
    id: null,
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

  useEffect(() => {
    getAllTasks().then(setTasksList);
  }, []);

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
      id: null,
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

  const onSave = async () => {
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
      taskRowData.id &&
      tasksList.length !== 0
    ) {
      const updatedTask = { ...taskRowData };

      const updatedTasks = tasksList.map((task) =>
        task.key === taskRowData.id ? updatedTask : task
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

    const newTask = {
      id: getRandomInt(),
      taskName: taskRowData.taskName,
      estimatedPomodoroCount: taskRowData.estimatedPomodoroCount,
      localPomodoroSessionCount: taskRowData.localPomodoroSessionCount,
    };

    await addTask(newTask);

    setTasksList(await getAllTasks());

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

  const onTaskCheck = (editableTask) => {
    let updatedTask = null;

    const updatedTasks = tasksList.map((task) => {
      if (task.key === editableTask.key) {
        updatedTask = {
          ...task,
          checked: !editableTask.checked,
          iconBgColor: editableTask.checked ? "" : "text-red-400",
          textDecoration: editableTask.checked ? "" : "line-through",
        };
        return updatedTask;
      }
      return task;
    });

    setTasksList(updatedTasks);
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
