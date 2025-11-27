import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

const TaskRow = ({ tasksList }) => {
  //TODO: try with flex may be
  return (
    <table className="border-separate border-spacing-y-2">
      {tasksList.map((task) => (
        <tr className="h-9">
          <div className="flex w-md bg-white">
            <FontAwesomeIcon icon={faCircleCheck} />
            <div className="font-semibold">{task.name}</div>
          </div>
        </tr>
      ))}
    </table>
  );
};

export default TaskRow;
