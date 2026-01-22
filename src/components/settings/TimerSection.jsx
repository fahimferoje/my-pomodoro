import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import TimerInputBox from "./TimerInputBox";

const TimerSection = ({ stageSeconds, timerMode }) => {
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
        <TimerInputBox title={"Pomodoro"} time={stageSeconds[0]} />
        <TimerInputBox title={"Short Break"} time={stageSeconds[1]} />
        <TimerInputBox title={"Long Break"} time={stageSeconds[2]} />
      </div>
    </div>
  );
};

export default TimerSection;
