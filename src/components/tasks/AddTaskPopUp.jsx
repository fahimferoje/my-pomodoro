import EstimatedPomodoros from "./EstimatedPomodoros";

const AddTaskPopUp = ({
  showAddTaskPopUp,
  onSave,
  onCancel,
  onInputValueChange,
  taskRowData,
  setTaskRowData,
  estimatedPomodoroCount,
}) => {
  return (
    <div
      className={`bg-white rounded-lg w-md h-60 text-black ${
        showAddTaskPopUp ? `block` : `hidden`
      }`}
    >
      <input
        className="shadow w-full py-5 px-5 text-gray-700 mt-5 focus:outline-none"
        type="text"
        placeholder="What are you working on?"
        value={taskRowData.taskName}
        onChange={onInputValueChange}
      />
      <EstimatedPomodoros
        setTaskRowData={setTaskRowData}
        estimatedPomodoroCount={estimatedPomodoroCount}
      />
      <div className="flex justify-end mt-5 mr-5">
        <button
          className="font-semibold text-[#9e9e9e] shadow-none hover:text-[#636363] px-4 text-[14px] 
        min-h-9 min-w-[74px] rounded-[9px] cursor-pointer"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          className="bg-[#45474b] font-semibold min-h-9 
          min-w-[74px] rounded-[9px] 
        cursor-pointer hover:bg-[#535356] 
        px-4 text-[14px] text-white"
          onClick={onSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default AddTaskPopUp;
