import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import AddTaskPopUp from "./AddTaskPopUp";
import TaskRow from "./TaskRow";
import TaskTitle from "./TaskTitle";
import AddTaskSection from "./AddTaskSection";
import { PopUpMode } from "../constants/AddTaskPopUpMode";

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
}) => {
  const { ADD, EDIT } = PopUpMode;
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
        {tasksList.length > 0 &&
          tasksList.map((task) =>
            addTaskPopUpMode.mode === EDIT &&
            addTaskPopUpMode.show &&
            addTaskPopUpMode.taskRowId === task.key ? (
              <AddTaskPopUp
                key={task.key}
                onSave={onSave}
                onCancel={onCancel}
                onInputValueChange={onInputValueChange}
                taskRowData={taskRowData}
                setTaskRowData={setTaskRowData}
                estimatedPomodoroCount={taskRowData.estimatedPomodoroCount}
                show={addTaskPopUpMode.show}
              />
            ) : (
              <TaskRow
                key={task.key}
                task={task}
                onTaskCheck={onTaskCheck}
                onTaskNameClick={onTaskNameClick}
                taskRowData={taskRowData}
                onTaskEdit={onTaskEdit}
              />
            )
          )}

        {addTaskPopUpMode.mode === ADD && addTaskPopUpMode.show && (
          <AddTaskPopUp
            onSave={onSave}
            onCancel={onCancel}
            onInputValueChange={onInputValueChange}
            taskRowData={taskRowData}
            setTaskRowData={setTaskRowData}
            estimatedPomodoroCount={taskRowData.estimatedPomodoroCount}
            show={addTaskPopUpMode.show}
          />
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
