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

  const [showAddTaskUIComponent, setShowAddTaskUIComponent] = useState({
    showAddTaskPopUp: false,
    showAddTaskButton: true,
  });

  const { ADD, EDIT } = PopUpMode;
  const [addTaskPopUpMode, setAddTaskPopUpMode] = useState({
    mode: null,
    taskRowId: null,
  });

  const onAddTaskButtonClick = () => {
    setShowAddTaskUIComponent({
      showAddTaskPopUp: true,
      showAddTaskButton: false,
    });

    setAddTaskPopUpMode((prevState) => {
      return {
        ...prevState,
        mode: ADD,
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

    //edit mode
    if (taskRowData.key && tasksList.length !== 0) {
      const updatedTask = { ...taskRowData };

      const updatedTasks = tasksList.map((task) =>
        task.key === taskRowData.key ? updatedTask : task
      );

      setTasksList(updatedTasks);
      setTaskTitleHeading(updatedTask.taskName);
      setActiveTask(updatedTask);
      setShowAddTaskUIComponent({
        showAddTaskButton: true,
        showAddTaskPopUp: false,
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
    if (
      showAddTaskUIComponent.showAddTaskPopUp &&
      !showAddTaskUIComponent.showAddTaskButton
    ) {
      setShowAddTaskUIComponent({
        showAddTaskButton: false,
        showAddTaskPopUp: false,
      });
    }

    setAddTaskPopUpMode({ mode: EDIT, taskRowId: task.key });

    setShowAddTaskUIComponent((prevState) => {
      return {
        ...prevState,
        showAddTaskPopUp: true,
      };
    });

    setTaskRowData(task);
  };

  return {
    taskTitleHeading,
    tasksList,
    taskRowData,
    showAddTaskUIComponent,
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
  };
};
