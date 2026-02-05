import Timer from "./Timer";
import Tabs from "./Tabs";
import TotalCompletedPomodorosCount from "./TotalCompletedPomodorosCount.jsx";
import Tasks from "../tasks/Tasks.jsx";
import { usePomodoroTimer } from "../hooks/usePomodoroTimer.js";
import { useState, useCallback } from "react";
import Header from "./Header.jsx";
import SettingsModal from "../settings/SettingsModal.jsx";
import ProgressBar from "./ProgressBar.jsx";

const PomodoroController = () => {
  const {
    tasksList,
    setTasksList,
    stageSeconds,
    timerMode,
    setStageSeconds,
    progressBarValue,
    setProgressBarValue,
    onComplete,
    onTabClick,
    totalCompletedPomodoros,
    longBreakInterval,
    setLongBreakInterval,
  } = usePomodoroTimer();

  const [showSettingsModal, setShowSettingsModal] = useState(false);

  const onSettingsClick = useCallback(() => {
    setShowSettingsModal(true);
  }, []);

  if (stageSeconds === null) {
    // data not loaded yet
    return <div>Loading...</div>;
  }

  return (
    <div
      className={`flex items-center min-h-dvh flex-col ${timerMode.typography.themeColor} `}
    >
      <Header onSettingsClick={onSettingsClick} />
      {showSettingsModal && (
        <SettingsModal
          setShowSettingsModal={setShowSettingsModal}
          stageSeconds={stageSeconds}
          setStageSeconds={setStageSeconds}
          longBreakInterval={longBreakInterval}
          setLongBreakInterval={setLongBreakInterval}
        />
      )}
      <ProgressBar
        maxValue={stageSeconds[timerMode.id]}
        progressBarValue={progressBarValue}
      />
      <div className={`bg-white/15 rounded-lg w-md h-80 mt-30 text-white`}>
        <div className="flex flex-col pt-6">
          <Tabs active={timerMode.id} onTabClick={onTabClick} />
        </div>
        <div className="flex flex-col pt-3">
          <Timer
            stageSeconds={stageSeconds}
            mode={timerMode}
            onComplete={onComplete}
            setProgressBarValue={setProgressBarValue}
          />
        </div>
      </div>
      <div className="flex items-center flex-col text-white mt-5">
        <TotalCompletedPomodorosCount
          totalCompletedPomodoros={totalCompletedPomodoros}
        />
      </div>
      <div>
        <Tasks tasksList={tasksList} setTasksList={setTasksList} />
      </div>
    </div>
  );
};

export default PomodoroController;
