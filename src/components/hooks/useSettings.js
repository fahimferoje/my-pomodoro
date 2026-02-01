import {
  addStageSecondsSettings,
  addLongBreakInterval,
} from "../../db/indexedDb.js";

export const useSettings = (
  stageSeconds,
  setStageSeconds,
  setShowSettingsModal,
  longBreakInterval,
  setLongBreakInterval,
) => {
  const onSave = async () => {
    try {
      await addStageSecondsSettings(stageSeconds);
      setStageSeconds([...stageSeconds]);

      await addLongBreakInterval(longBreakInterval);
      setLongBreakInterval(longBreakInterval);

      setShowSettingsModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onClose = () => {
    setShowSettingsModal(false);
  };

  return { onSave, onClose };
};
