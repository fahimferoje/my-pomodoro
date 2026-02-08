export const useEstimatedPomodoro = (setTaskRowData) => {
  const onIncrement = () => {
    setTaskRowData((prevState) => {
      const countValue = parseInt(prevState.estimatedPomodoroCount);

      if (!countValue) {
        return;
      }
      return {
        ...prevState,
        estimatedPomodoroCount: countValue + 1,
      };
    });
  };

  const onDecrement = () => {
    setTaskRowData((prevState) => {
      const countValue = parseInt(prevState.estimatedPomodoroCount);

      if (!countValue) {
        return;
      }
      return {
        ...prevState,
        estimatedPomodoroCount: countValue - 1,
      };
    });
  };

  const onValueChange = (e) => {
    const value = parseInt(e.target.value);

    setTaskRowData((prevState) => {
      return {
        ...prevState,
        estimatedPomodoroCount: !value ? "" : value,
      };
    });
  };

  return { onIncrement, onDecrement, onValueChange };
};
