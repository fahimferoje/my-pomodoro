import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

const TaskRow = ({
  tasksList,
  onTaskCheck,
  onTaskNameClick,
  taskNameTheme: { iconBgColor, textDecoration },
}) => {
  return (
    <>
      {tasksList.map((task) => (
        <div className="flex bg-white/80 rounded-lg w-md h-16 pl-2 items-center">
          <FontAwesomeIcon
            onClick={onTaskCheck}
            className={`text-2xl ${iconBgColor}`}
            icon={faCircleCheck}
          />
          <div className={`font-semibold pl-2`}>
            <button className={textDecoration} onClick={onTaskNameClick}>
              {task.name}
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default TaskRow;
