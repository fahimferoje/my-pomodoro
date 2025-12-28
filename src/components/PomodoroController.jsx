import Timer from "./Timer";
import Tabs from "./Tabs";
import PomodoroSessionCount from "./PomodoroSessionCount";
import Tasks from "../components/tasks/Tasks";
import { useTasks } from "../components/hooks/useTasks.js";
import { usePomodoroTimer } from "../components/hooks/usePomodoroTimer.js";

const PomodoroController = () => {
  const {
    taskTitleHeading,
    tasksList,
    taskRowData,
    setTaskRowData,
    showAddTaskUIComponent,
    activeTask,
    setActiveTask,
    onAddTaskButtonClick,
    onCancel,
    onSave,
    onInputValueChange,
    onTaskCheck,
    onTaskNameClick,
    setTasksList,
  } = useTasks();

  const { onComplete, onTabClick, pomodoroSessionCount, timerMode } =
    usePomodoroTimer(activeTask, setActiveTask, setTasksList);

  return (
    <div
      className={`flex items-center min-h-dvh flex-col ${timerMode.themeColor} `}
    >
      <div className={`bg-white/15 rounded-lg w-md h-80 mt-30 text-white`}>
        <div className="flex flex-col pt-6">
          <Tabs active={timerMode.active} onTabClick={onTabClick} />
        </div>
        <div className="flex flex-col pt-3">
          <Timer mode={timerMode.mode} onComplete={onComplete} />
        </div>
      </div>
      <div className="flex items-center flex-col text-white mt-5">
        <PomodoroSessionCount pomodoroSessionCount={pomodoroSessionCount} />
      </div>
      <div>
        <Tasks
          taskTitleHeading={taskTitleHeading}
          tasksList={tasksList}
          showAddTaskUIComponent={showAddTaskUIComponent}
          taskRowData={taskRowData}
          onTaskCheck={onTaskCheck}
          onTaskNameClick={onTaskNameClick}
          setTaskRowData={setTaskRowData}
          onAddTaskButtonClick={onAddTaskButtonClick}
          onSave={onSave}
          onCancel={onCancel}
          onInputValueChange={onInputValueChange}
        />
      </div>
    </div>
  );
};

export default PomodoroController;
