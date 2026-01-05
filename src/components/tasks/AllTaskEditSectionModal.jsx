import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const AllTaskEditSectionModal = () => {
  return (
    <div
      className={`absolute bg-white rounded shadow-lg w-[210px] h-56 
        text-black flex items-center flex-col z-40 mt-8 ml-60`}
    >
      <div className="pt-5 pl-3 w-full">
        <div className="hover:bg-neutral-200">
          <FontAwesomeIcon className="cursor-pointer" icon={faTrash} />
          <button className="ml-2 cursor-pointer">Clear finished tasks</button>
        </div>

        <div className="hover:bg-neutral-200">
          <FontAwesomeIcon className="cursor-pointer" icon={faTrash} />
          <button className="ml-2 cursor-pointer">Clear all tasks</button>
        </div>
      </div>
    </div>
  );
};

export default AllTaskEditSectionModal;
