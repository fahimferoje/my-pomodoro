import React from "react";

const AddTaskPopUp = ({ showAddTaskPopUp }) => {
  return (
    <div
      className={`bg-white rounded-lg w-md h-80 text-black ${
        showAddTaskPopUp ? `block` : `hidden`
      }`}
    >
      <input
        className="
        shadow w-full
        py-5 
        px-5 
        text-gray-700 
        mt-5
        focus:outline-none
        "
        type="text"
        placeholder="What are you working on?"
      />
    </div>
  );
};

export default AddTaskPopUp;
