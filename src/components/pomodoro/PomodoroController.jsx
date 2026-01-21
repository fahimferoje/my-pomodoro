import Timer from "./Timer";
import Tabs from "./Tabs";
import TotalCompletedPomodorosCount from "./TotalCompletedPomodorosCount.jsx";
import Tasks from "../tasks/Tasks.jsx";
import { usePomodoroTimer } from "../hooks/usePomodoroTimer.js";
import { useState } from "react";
import Header from "./Header.jsx";
import SettingsModal from "../settings/SettingsModal.jsx";

const PomodoroController = () => {
  const [tasksList, setTasksList] = useState([]);

  const { onComplete, onTabClick, totalCompletedPomodoros, timerMode } =
    usePomodoroTimer(setTasksList);

  const [showSettingsModal, setShowSettingsModal] = useState(false);

  return (
    <div
      className={`flex items-center min-h-dvh flex-col ${timerMode.typography.themeColor} `}
    >
      <Header />
      <SettingsModal />
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
        <Tasks tasksList={tasksList} setTasksList={setTasksList} />
      </div>
    </div>
  );
};

export default PomodoroController;
