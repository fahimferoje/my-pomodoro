import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import AddTaskPopUp from "./AddTaskPopUp";
import TaskRow from "./TaskRow";
import TaskTitle from "./TaskTitle";

const Tasks = ({
  taskTitleHeading,
  tasksList,
  onTaskCheck,
  onTaskNameClick,
  taskRowData,
  setTaskRowData,
  showAddTaskUIComponent: { showAddTaskPopUp, showAddTaskButton },
  onAddTaskButtonClick,
  onSave,
  onCancel,
  onInputValueChange,
}) => {
  return (
    <div>
      <div className="text-center text-white text-lg">
        <TaskTitle taskTitleHeading={taskTitleHeading} />
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
             w-md text-white ${showAddTaskButton ? `block` : `hidden`}`}
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
            showAddTaskPopUp={showAddTaskPopUp}
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
