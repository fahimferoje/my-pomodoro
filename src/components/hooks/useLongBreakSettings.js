import { useCallback } from "react";

export const useLongBreakSettings = (setLongBreakInterval) => {
  const onValueChange = useCallback((value) => {
    const inputValue = parseInt(value);

    if (!inputValue || inputValue <= 0) {
      return;
    }

    setLongBreakInterval(inputValue);
  }, []);

  const onIncrement = useCallback(() => {
    setLongBreakInterval((prev) => {
      return prev < 1 ? prev : prev + 1;
    });
  }, []);
  const onDecrement = useCallback(() => {
    setLongBreakInterval((prev) => {
      return prev - 1 <= 0 ? prev : prev - 1;
    });
  }, []);

  return { onValueChange, onIncrement, onDecrement };
};
