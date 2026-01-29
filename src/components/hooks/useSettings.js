import { addStageSecondsSettings } from "../../db/indexedDb.js";

export const useSettings = (
  stageSeconds,
  setStageSeconds,
  setShowSettingsModal,
) => {
  const onSave = async () => {
    try {
      await addStageSecondsSettings(stageSeconds);
      setStageSeconds([...stageSeconds]);
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
