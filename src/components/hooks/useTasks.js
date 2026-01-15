import { useState, useEffect } from "react";
import { PopUpMode } from "../constants/AddTaskPopUpMode";
import {
  addTask,
  getAllTasks,
  updateTask,
  addActiveTask,
  updateActiveTask,
  getActiveTask,
} from "../../db/indexedDb.js";

export const useTasks = () => {
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

  const [showAddTaskButton, setShowAddTaskButton] = useState(true);

  const { ADD, EDIT } = PopUpMode;
  const [addTaskPopUpMode, setAddTaskPopUpMode] = useState({
    mode: null,
    taskRowId: null,
    show: false,
  });

  useEffect(() => {
    console.log("running effect");
    getAllTasks().then(setTasksList);
    getActiveTask()
      .then((res) => setTaskTitleHeading(res.taskName))
      .catch((err) => {
        setTaskTitleHeading("Time to focus");
        console.error("Failed to fetch active task" + err);
      });
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
      //id: null,
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

    //edit mode
    if (
      addTaskPopUpMode.mode === EDIT &&
      taskRowData.id &&
      tasksList.length !== 0
    ) {
      const updatedTask = { ...taskRowData };

      await updateTask(updatedTask);

      setTasksList((prev) =>
        prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
      );

      setTaskTitleHeading(updatedTask.taskName);
      updateActiveTask(updatedTask);

      setAddTaskPopUpMode((prev) => {
        return {
          ...prev,
          show: false,
        };
      });

      return;
    }

    const newTask = {
      ...taskRowData,
      taskName: taskRowData.taskName,
      estimatedPomodoroCount: taskRowData.estimatedPomodoroCount,
      localPomodoroSessionCount: taskRowData.localPomodoroSessionCount,
    };

    const id = await addTask(newTask);

    const persistedNewTask = {
      id,
      ...newTask,
    };

    const activeTask = await getActiveTask();

    if (!activeTask) {
      await addActiveTask(persistedNewTask);
      setTaskTitleHeading(persistedNewTask.taskName);
    }

    setTasksList((prev) => [...prev, persistedNewTask]);

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

  const onTaskCheck = async (editableTask) => {
    const updatedTask = {
      ...editableTask,
      checked: !editableTask.checked,
      iconBgColor: editableTask.checked ? "" : "text-red-400",
      textDecoration: editableTask.checked ? "" : "line-through",
    };

    await updateTask(updatedTask);

    setTasksList((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const onTaskNameClick = async (task) => {
    await updateActiveTask(task);
    setTaskTitleHeading(task.taskName);
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

    setAddTaskPopUpMode({ mode: EDIT, taskRowId: task.id, show: true });

    setTaskRowData(task);
    setShowAddTaskButton(true);
  };

  return {
    taskTitleHeading,
    setTaskTitleHeading,
    tasksList,
    taskRowData,
    setTaskRowData,
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
