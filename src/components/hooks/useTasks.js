import { useState } from "react";

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
  };
};
