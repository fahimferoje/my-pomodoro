import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";

const EstimatedPomodoros = ({ setTaskRowData, estimatedPomodoroCount }) => {
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

  return (
    <div className="flex flex-col mt-5 ml-5">
      <h1 className="font-semibold text-left">Est Pomodoros</h1>
      <div className="flex mt-3">
        <input
          className="w-24 bg-gray-100"
          type="text"
          value={estimatedPomodoroCount}
          onChange={onValueChange}
        />
        <FontAwesomeIcon
          className={`cursor-pointer text-2xl`}
          icon={faCaretUp}
          onClick={onIncrement}
        />
        <FontAwesomeIcon
          className={`cursor-pointer text-2xl`}
          icon={faCaretDown}
          onClick={onDecrement}
        />
      </div>
    </div>
  );
};

export default EstimatedPomodoros;
