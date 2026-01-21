import TimerSection from "./TimerSection";

const SettingsModal = ({ onClose }) => {
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
        <TimerSection />
      </div>
    </div>
  );
};

export default SettingsModal;
