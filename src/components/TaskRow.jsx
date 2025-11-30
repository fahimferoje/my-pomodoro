import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

const TaskRow = ({ tasksList }) => {
  return (
    <>
      {tasksList.map((task) => (
        <div className="flex w-md bg-white h-16 pl-2 items-center">
          <FontAwesomeIcon className="text-2xl" icon={faCircleCheck} />
          <div className="font-semibold pl-2">{task.name}</div>
        </div>
      ))}
    </>
  );
};

export default TaskRow;
