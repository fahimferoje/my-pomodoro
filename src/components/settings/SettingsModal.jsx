import TimerSection from "./TimerSection";
import { useSettings } from "../hooks/useSettings.js";

const SettingsModal = ({
  setShowSettingsModal,
  stageSeconds,
  setStageSeconds,
}) => {
  const { onSave, onClose } = useSettings(
    stageSeconds,
    setStageSeconds,
    setShowSettingsModal,
  );

  return (
    <div
      className={`absolute bg-white rounded shadow-lg w-md h- 
        text-black flex items-center flex-col z-40 mt-20 h-128`}
    >
      <div className="pl-4">
        <div className="flex items-center justify-center w-md h-14 border-b border-gray-400 px-4">
          <h2 className="text-lg font-semibold tracking-wide text-gray-700 uppercase">
            SETTING
          </h2>
          <button
            onClick={onClose}
            className="absolute w-5 right-4 text-gray-400 hover:text-gray-600 hover:rounded hover:bg-gray-200"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <TimerSection
          stageSeconds={stageSeconds}
          setStageSeconds={setStageSeconds}
        />
      </div>
      <button
        className="ml-80 mt-60 bg-[#45474b] font-semibold rounded-[9px] 
        cursor-pointer hover:bg-[#535356] 
        px-4 text-[14px] text-white min-h-9 
          min-w-[74px]"
        onClick={onSave}
      >
        Save
      </button>
    </div>
  );
};

export default SettingsModal;
