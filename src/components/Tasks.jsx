import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import AddTaskPopUp from "./AddTaskPopUp";

const Tasks = () => {
  const [showAddTaskPopUp, setShowAddTaskPopUp] = useState(false);

  const onAddTaskButtonClick = () => {
    setShowAddTaskPopUp(true);
  };

  const onCancel = () => {
    setShowAddTaskPopUp(false);
  };

  const onSave = () => {};

  return (
    <div>
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
      <div className="flex flex-col items-center w-md">
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
          />
        </div>
      </div>
    </div>
  );
};

export default Tasks;
