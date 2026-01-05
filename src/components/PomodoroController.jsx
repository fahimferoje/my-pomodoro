import Timer from "./Timer";
import Tabs from "./Tabs";
import TotalCompletedPomodorosCount from "./TotalCompletedPomodorosCount.jsx";
import Tasks from "../components/tasks/Tasks";
import { useTasks } from "../components/hooks/useTasks.js";
import { usePomodoroTimer } from "../components/hooks/usePomodoroTimer.js";

const PomodoroController = () => {
  const {
    taskTitleHeading,
    tasksList,
    taskRowData,
    setTaskRowData,
    activeTask,
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
    onAllTasksSectionEdit,
    showAllTasksSectionEditModal,
    allTasksEditSectionModalRef,
  } = useTasks();

  const { onComplete, onTabClick, totalCompletedPomodoros, timerMode } =
    usePomodoroTimer(activeTask, setActiveTask, setTasksList);

  return (
    <div
      className={`flex items-center min-h-dvh flex-col ${timerMode.typography.themeColor} `}
    >
      <div className={`bg-white/15 rounded-lg w-md h-80 mt-30 text-white`}>
        <div className="flex flex-col pt-6">
          <Tabs active={timerMode.id} onTabClick={onTabClick} />
        </div>
        <div className="flex flex-col pt-3">
          <Timer mode={timerMode} onComplete={onComplete} />
        </div>
      </div>
      <div className="flex items-center flex-col text-white mt-5">
        <TotalCompletedPomodorosCount
          totalCompletedPomodoros={totalCompletedPomodoros}
        />
      </div>
      <div>
        <Tasks
          taskTitleHeading={taskTitleHeading}
          tasksList={tasksList}
          taskRowData={taskRowData}
          onTaskCheck={onTaskCheck}
          onTaskNameClick={onTaskNameClick}
          setTaskRowData={setTaskRowData}
          onAddTaskButtonClick={onAddTaskButtonClick}
          onSave={onSave}
          onCancel={onCancel}
          onInputValueChange={onInputValueChange}
          onTaskEdit={onTaskEdit}
          addTaskPopUpMode={addTaskPopUpMode}
          showAddTaskButton={showAddTaskButton}
          onAllTasksSectionEdit={onAllTasksSectionEdit}
          showAllTasksSectionEditModal={showAllTasksSectionEditModal}
          allTasksEditSectionModalRef={allTasksEditSectionModalRef}
        />
      </div>
    </div>
  );
};

export default PomodoroController;
