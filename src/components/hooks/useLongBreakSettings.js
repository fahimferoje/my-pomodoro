export const useLongBreakSettings = (setLongBreakInterval) => {
  const onValueChange = (value) => {
    const inputValue = parseInt(value);

    if (!inputValue || inputValue <= 0) {
      return;
    }

    setLongBreakInterval(inputValue);
  };

  const onIncrement = () => {
    setLongBreakInterval((prev) => {
      return prev < 1 ? prev : prev + 1;
    });
  };
  const onDecrement = () => {
    setLongBreakInterval((prev) => {
      return prev - 1 <= 0 ? prev : prev - 1;
    });
  };

  return { onValueChange, onIncrement, onDecrement };
};
