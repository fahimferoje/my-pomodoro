export const useTimerSettings = (setStageSeconds) => {
  const STAGE_INDEX = {
    pomodoro: 0,
    short_break: 1,
    long_break: 2,
  };

  const onValueChange = (e, id) => {
    setStageSeconds((prev) => {
      const value = e.target.value;

      const index = STAGE_INDEX[id];
      if (index === undefined) return prev;

      const next = [...prev];
      next[index] = value;

      return next;
    });
  };

  const onIncrement = (id) => {
    updateStage(id, 1);
  };

  const onDecrement = (id) => {
    updateStage(id, -1);
  };

  const updateStage = (id, delta) => {
    setStageSeconds((prev) => {
      const index = STAGE_INDEX[id];
      if (index === undefined) return prev;

      const next = [...prev];
      next[index] = Number(next[index]) + delta;
      return next;
    });
  };

  return {
    stages: Object.keys(STAGE_INDEX),
    getStageValue: (stage, stageSeconds) => stageSeconds[STAGE_INDEX[stage]],
    onValueChange,
    onIncrement,
    onDecrement,
  };
};
