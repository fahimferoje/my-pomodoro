import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import AddTaskPopUp from "./AddTaskPopUp";
import TaskRow from "./TaskRow";
import TaskTitle from "./TaskTitle";
import AddTaskSection from "./AddTaskSection";

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
  onTaskEdit,
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
            onTaskEdit={onTaskEdit}
          />
        )}
        <AddTaskSection
          showAddTaskButton={showAddTaskButton}
          onAddTaskButtonClick={onAddTaskButtonClick}
        />
        <div>
          <AddTaskPopUp
            showAddTaskPopUp={showAddTaskPopUp}
            onSave={onSave}
            onCancel={onCancel}
            onInputValueChange={onInputValueChange}
            taskRowData={taskRowData}
            setTaskRowData={setTaskRowData}
            estimatedPomodoroCount={taskRowData.estimatedPomodoroCount}
          />
        </div>
      </div>
    </div>
  );
};

export default Tasks;
