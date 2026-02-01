import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";

const TimerInputBox = ({
  id,
  title,
  onValueChange,
  onIncrement,
  onDecrement,
  time,
}) => {
  return (
    <div className="flex flex-col mt-5 ml-5">
      <h1 className="font-semibold text-left">{title}</h1>
      <div className="flex mt-3 relative">
        <input
          className="w-24 bg-gray-200"
          type="text"
          value={time}
          onChange={(e) => onValueChange(e.target.value, id)}
        />
        <div className="flex flex-col absolute ml-20 p-0">
          <FontAwesomeIcon
            className={`cursor-pointer text-sm p-0`}
            icon={faCaretUp}
            onClick={() => onIncrement(id)}
          />
          <FontAwesomeIcon
            className={`cursor-pointer text-sm p-0`}
            icon={faCaretDown}
            onClick={() => onDecrement(id)}
          />
        </div>
      </div>
    </div>
  );
};

export default TimerInputBox;
