import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const AddTaskSection = ({ showAddTaskButton, onAddTaskButtonClick }) => {
  return (
    <div
      className={`flex items-center justify-center gap-1
             text-center h-15 border-2 border-dashed border-zinc-50
             w-md text-white ${showAddTaskButton ? `block` : `hidden`}`}
    >
      <FontAwesomeIcon
        className="cursor-pointer"
        icon={faCirclePlus}
        onClick={onAddTaskButtonClick}
      />
      <button
        className="not-last:p-0 cursor-pointer order-last"
        onClick={onAddTaskButtonClick}
      >
        Add Task
      </button>
    </div>
  );
};

export default AddTaskSection;
