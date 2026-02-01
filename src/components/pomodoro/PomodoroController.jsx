import Timer from "./Timer";
import Tabs from "./Tabs";
import TotalCompletedPomodorosCount from "./TotalCompletedPomodorosCount.jsx";
import Tasks from "../tasks/Tasks.jsx";
import { usePomodoroTimer } from "../hooks/usePomodoroTimer.js";
import { useState, useEffect } from "react";
import Header from "./Header.jsx";
import SettingsModal from "../settings/SettingsModal.jsx";
import { Mode } from "../constants/PomodoroMode.js";
import { getStageSeconds } from "../../db/indexedDb.js";

const PomodoroController = () => {
  const [tasksList, setTasksList] = useState([]);

  const { POMODORO } = Mode;

  const [timerMode, setTimerMode] = useState(POMODORO);

  const [stageSeconds, setStageSeconds] = useState(null);

  const [longBreakInterval, setLongBreakInterval] = useState(4);

  useEffect(() => {
    const fetchStageSeconds = async () => {
      try {
        const res = await getStageSeconds();
        setStageSeconds(res.length !== 0 ? res : [1, 10, 1]);
      } catch (err) {
        console.log(err);
      }
    };

    fetchStageSeconds();
  }, []);

  const { onComplete, onTabClick, totalCompletedPomodoros } = usePomodoroTimer(
    setTasksList,
    timerMode,
    setTimerMode,
  );

  const [showSettingsModal, setShowSettingsModal] = useState(false);

  const onSettingsClick = async () => {
    setShowSettingsModal(true);
  };

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
      <div className={`bg-white/15 rounded-lg w-md h-80 mt-30 text-white`}>
        <div className="flex flex-col pt-6">
          <Tabs active={timerMode.id} onTabClick={onTabClick} />
        </div>
        <div className="flex flex-col pt-3">
          <Timer
            stageSeconds={stageSeconds}
            mode={timerMode}
            onComplete={onComplete}
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
