import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

const Tasks = () => {
  return (
    <div>
      <div
        className="flex flex-row text-white mt-5 w-md 
                  justify-between"
      >
        <h1 className="">Tasks</h1>
        <div className="">
          <h1>Icon</h1>
        </div>
      </div>
      <div className="border-b-4 pt-3 border-zinc-50"></div>
      <br />
      <div className="flex flex-col items-center w-md">
        <div className="text-center h-15 border-2 border-dashed border-zinc-50 w-md text-white">
          <button className="text-center p-0 justify-center">
            <FontAwesomeIcon icon={faCirclePlus} />
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
