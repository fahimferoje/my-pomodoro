import { useState, useEffect } from "react";
import { PopUpMode } from "../constants/AddTaskPopUpMode";
import { addTask, getAllTasks, updateTask } from "../../db/indexedDb.js";

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

      await updateTask(updatedTask);

      setTasksList((prev) =>
        prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
      );

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

    setTasksList((prev) =>
      prev.map((task) =>
        task.id === persistedNewTask.id ? persistedNewTask : task
      )
    );

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

    setAddTaskPopUpMode({ mode: EDIT, taskRowId: task.id, show: true });

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
