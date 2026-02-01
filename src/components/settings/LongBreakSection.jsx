import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";

const LongBreakSection = ({ longBreakInterval }) => {
  const onValueChange = () => {};

  const onIncrement = () => {};
  const onDecrement = () => {};

  return (
    <div className="flex w-md mt-4">
      <div className="basis-md">
        <h2 className="text-lg font-medium ml-2">Long Break Interval</h2>
      </div>
      <div className="basis-sm ml-5">
        <input
          className="w-24 bg-gray-200"
          type="text"
          value={longBreakInterval}
          onChange={(e) => onValueChange(e.target.value)}
        />
        <div className="flex flex-col absolute ml-20 p-0 -mt-6">
          <FontAwesomeIcon
            className={`cursor-pointer text-sm p-0`}
            icon={faCaretUp}
            onClick={onIncrement}
          />
          <FontAwesomeIcon
            className={`cursor-pointer text-sm p-0`}
            icon={faCaretDown}
            onClick={onDecrement}
          />
        </div>
      </div>
    </div>
  );
};

export default LongBreakSection;
