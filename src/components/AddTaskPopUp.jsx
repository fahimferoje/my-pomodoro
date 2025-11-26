import React from "react";

const AddTaskPopUp = ({ showAddTaskPopUp, onSave, onCancel }) => {
  return (
    <div
      className={`bg-white rounded-lg w-md h-80 text-black ${
        showAddTaskPopUp ? `block` : `hidden`
      }`}
    >
      <input
        className="shadow w-full py-5 px-5 text-gray-700 mt-5 focus:outline-none"
        type="text"
        placeholder="What are you working on?"
      />
      <div className="flex justify-end">
        <button
          className="font-semibold text-[#9e9e9e] shadow-none hover:text-[#636363] px-4 text-[14px] 
        min-h-[36px] min-w-[74px] rounded-[9px] cursor-pointer"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          className="bg-[#45474b] font-semibold min-h-[36px] min-w-[74px] rounded-[9px] 
        cursor-pointer hover:bg-[#535356] px-4 text-[14px] text-white"
          onClick={onSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default AddTaskPopUp;
