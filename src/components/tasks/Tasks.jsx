import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import AddTaskPopUp from "./AddTaskPopUp";
import TaskRow from "./TaskRow";
import TaskTitle from "./TaskTitle";
import AddTaskSection from "./AddTaskSection";
import { PopUpMode } from "../constants/AddTaskPopUpMode";
import { Fragment } from "react";
import AllTaskEditSectionModal from "./AllTaskEditSectionModal";

const Tasks = ({
  taskTitleHeading,
  tasksList,
  onTaskCheck,
  onTaskNameClick,
  taskRowData,
  setTaskRowData,
  onAddTaskButtonClick,
  onSave,
  onCancel,
  onInputValueChange,
  onTaskEdit,
  addTaskPopUpMode,
  showAddTaskButton,
  onAllTasksSectionEdit,
  showAllTasksSectionEditModal,
}) => {
  const { ADD, EDIT } = PopUpMode;

  const addTaskPopupProps = {
    onSave,
    onCancel,
    onInputValueChange,
    taskRowData,
    setTaskRowData,
    estimatedPomodoroCount: taskRowData.estimatedPomodoroCount,
    show: addTaskPopUpMode.show,
  };

  return (
    <div className="relative">
      <div className="text-center text-white text-lg">
        <TaskTitle taskTitleHeading={taskTitleHeading} />
      </div>
      <div className="flex flex-row text-white mt-5 w-md justify-between">
        <h1 className="">Tasks</h1>
        <FontAwesomeIcon
          icon={faEllipsisVertical}
          onClick={onAllTasksSectionEdit}
        />
        {showAllTasksSectionEditModal && <AllTaskEditSectionModal />}
      </div>
      <div className="border-b-4 pt-3 border-zinc-50"></div>
      <br />

      <div className="flex flex-col items-center w-md space-y-2">
        {tasksList.map((task) => {
          const isEditPopup =
            addTaskPopUpMode.mode === EDIT &&
            addTaskPopUpMode.show &&
            addTaskPopUpMode.taskRowId === task.key;

          return (
            <Fragment key={task.key}>
              {isEditPopup ? (
                <AddTaskPopUp {...addTaskPopupProps} />
              ) : (
                <TaskRow
                  key={task.key}
                  task={task}
                  onTaskCheck={onTaskCheck}
                  onTaskNameClick={onTaskNameClick}
                  taskRowData={taskRowData}
                  onTaskEdit={onTaskEdit}
                />
              )}
            </Fragment>
          );
        })}

        {addTaskPopUpMode.mode === ADD && addTaskPopUpMode.show && (
          <AddTaskPopUp {...addTaskPopupProps} />
        )}
        {showAddTaskButton && (
          <AddTaskSection
            showAddTaskButton={showAddTaskButton}
            onAddTaskButtonClick={onAddTaskButtonClick}
          />
        )}
      </div>
    </div>
  );
};

export default Tasks;
