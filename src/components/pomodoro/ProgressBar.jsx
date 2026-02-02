const ProgressBar = ({ maxValue, progressBarValue }) => {
  return (
    <progress
      className="[&::-webkit-progress-bar]:rounded-lg 
          [&::-webkit-progress-value]:rounded-lg 
          [&::-webkit-progress-bar]:bg-neutral-600 
          [&::-webkit-progress-value]:bg-gray-100
          [&::-moz-progress-bar]:bg-neutral-600
          w-md h-0.5"
      value={progressBarValue}
      max={maxValue}
    ></progress>
  );
};

export default ProgressBar;
