import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import AddTaskPopUp from "./AddTaskPopUp";
import TaskRow from "./TaskRow";
import TaskTitle from "./TaskTitle";

const Tasks = () => {
  const [showAddTaskPopUp, setShowAddTaskPopUp] = useState(false);
  const [tasksList, setTasksList] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [taskTitle, setTaskTitle] = useState("Time to focus!");

  const [taskNameTheme, setTaskNameTheme] = useState({
    iconBgColor: "",
    textDecoration: "",
  });

  const onAddTaskButtonClick = () => {
    setShowAddTaskPopUp(true);
    setTaskName("");
  };

  const onCancel = () => {
    setShowAddTaskPopUp(false);
  };

  const onSave = () => {
    if (!taskName) {
      return;
    }

    setTasksList([...tasksList, { name: taskName }]);
    setTaskName("");
  };

  const onInputValueChange = (e) => {
    setTaskName(e.target.value);
  };

  const onTaskCheck = (e) => {
    setTaskNameTheme({
      iconBgColor: "text-red-400",
      textDecoration: "line-through",
    });
  };

  const onTaskNameClick = (e) => {
    setTaskTitle(e.target.innerText);
  };

  return (
    <div>
      <div className="text-center text-white text-lg">
        <TaskTitle taskTitle={taskTitle} />
      </div>
      <div
        className="flex flex-row text-white mt-5 w-md 
                  justify-between"
      >
        <h1 className="">Tasks</h1>
        <div className="">
          <h1>Icon</h1>
        </div>
      </div>
      <div className="border-b-4 pt-3 border-zinc-50"></div>
      <br />

      <div className="flex flex-col items-center w-md space-y-2">
        {tasksList.length > 0 && (
          <TaskRow
            tasksList={tasksList}
            onTaskCheck={onTaskCheck}
            onTaskNameClick={onTaskNameClick}
            taskNameTheme={taskNameTheme}
          />
        )}
        <div className="text-center h-15 border-2 border-dashed border-zinc-50 w-md text-white">
          <button
            className="text-center p-0 justify-center"
            onClick={onAddTaskButtonClick}
          >
            <FontAwesomeIcon icon={faCirclePlus} />
            Add Task
          </button>
          <AddTaskPopUp
            showAddTaskPopUp={showAddTaskPopUp}
            onSave={onSave}
            onCancel={onCancel}
            onInputValueChange={onInputValueChange}
            taskName={taskName}
          />
        </div>
      </div>
    </div>
  );
};

export default Tasks;
