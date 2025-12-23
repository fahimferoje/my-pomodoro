import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import AddTaskPopUp from "./AddTaskPopUp";
import TaskRow from "./TaskRow";
import TaskTitle from "./TaskTitle";

const Tasks = () => {
  const [tasksList, setTasksList] = useState([]);

  const [showAddTaskUIComponent, setShowAddTaskUIComponent] = useState({
    showAddTaskPopUp: false,
    showAddTaskButton: true,
  });

  const [taskRowData, setTaskRowData] = useState({
    taskName: "",
    taskTitle: "Time to focus!",
    checked: false,
    iconBgColor: "",
    textDecoration: "",
    estimatedPomodoroCount: 1,
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

    setTasksList([
      ...tasksList,
      {
        name: taskRowData.taskName,
        estimatedPomodoroCount: taskRowData.estimatedPomodoroCount,
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

  const onTaskNameClick = (e) => {
    setTaskRowData((prevState) => {
      return {
        ...prevState,
        taskTitle: e.target.innerText,
      };
    });
  };

  return (
    <div>
      <div className="text-center text-white text-lg">
        <TaskTitle taskTitle={taskRowData.taskTitle} />
      </div>
      <div
        className="flex flex-row text-white mt-5 w-md 
                  justify-between"
      >
        <h1 className="">Tasks</h1>
        <FontAwesomeIcon icon={faEllipsisVertical} />
      </div>
      <div className="border-b-4 pt-3 border-zinc-50"></div>
      <br />

      <div className="flex flex-col items-center w-md space-y-2">
        {tasksList.length > 0 && (
          <TaskRow
            tasksList={tasksList}
            onTaskCheck={onTaskCheck}
            onTaskNameClick={onTaskNameClick}
            taskRowData={taskRowData}
          />
        )}
        <div
          className={`flex items-center justify-center gap-1
             text-center h-15 border-2 border-dashed border-zinc-50
             w-md text-white ${
               showAddTaskUIComponent.showAddTaskButton ? `block` : `hidden`
             }`}
        >
          <FontAwesomeIcon
            className="cursor-pointer"
            icon={faCirclePlus}
            onClick={onAddTaskButtonClick}
          />
          <button
            className="not-last:p-0 cursor-pointer"
            onClick={onAddTaskButtonClick}
          >
            Add Task
          </button>
        </div>
        <div>
          <AddTaskPopUp
            showAddTaskPopUp={showAddTaskUIComponent.showAddTaskPopUp}
            onSave={onSave}
            onCancel={onCancel}
            onInputValueChange={onInputValueChange}
            taskName={taskRowData.taskName}
            setTaskRowData={setTaskRowData}
            estimatedPomodoroCount={taskRowData.estimatedPomodoroCount}
          />
        </div>
      </div>
    </div>
  );
};

export default Tasks;
