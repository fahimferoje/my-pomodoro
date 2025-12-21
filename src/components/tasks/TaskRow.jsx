import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";

const TaskRow = ({
  tasksList,
  onTaskCheck,
  onTaskNameClick,
  taskRowData: { iconBgColor, textDecoration },
}) => {
  return (
    <>
      {tasksList.map((task) => (
        <div className="flex bg-white/80 rounded-lg w-md h-16 pl-2 items-center">
          <FontAwesomeIcon
            onClick={onTaskCheck}
            className={`cursor-pointer text-2xl ${iconBgColor}`}
            icon={faCircleCheck}
          />
          <div className={`font-semibold pl-2 basis-3xl cursor-pointer`}>
            <button
              className={`text-left cursor-pointer w-full ${textDecoration}`}
              onClick={onTaskNameClick}
            >
              {task.name}
            </button>
          </div>
          <div className="basis-24 font-semibold mr-3">
            <h1 className="text-center">0/3</h1>
          </div>
          <div
            className="w-30 bg-white text-center 
          basis-12 border border-[#dfdfdf] mr-3 
          cursor-pointer hover:bg-[#dfdfdf]"
          >
            <FontAwesomeIcon className="" icon={faEllipsisVertical} />
          </div>
        </div>
      ))}
    </>
  );
};

export default TaskRow;
