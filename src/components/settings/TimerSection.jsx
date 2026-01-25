import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import TimerInputBox from "./TimerInputBox";

const TimerSection = ({ stageSeconds, setStageSeconds, timerMode }) => {
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

  return (
    <div className="flex flex-col w-md">
      <div className="flex w-md h-16 pl-2 items-center">
        <FontAwesomeIcon
          className={`cursor-pointer text-lg text-black`}
          icon={faClock}
        />
        <h2 className="text-lg font-medium ml-2">TIMER</h2>
      </div>
      <h3 className="text-lg font-medium ml-2">Time (minutes)</h3>
      <div className="flex">
        {Object.keys(STAGE_INDEX).map((stageSec) => {
          console.log(stageSec);
          return (
            <TimerInputBox
              title={`${stageSec}`}
              id={`${stageSec}`}
              onChange={onValueChange}
              onIncrement={onIncrement}
              onDecrement={onDecrement}
              time={stageSeconds[STAGE_INDEX[stageSec]]}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TimerSection;
