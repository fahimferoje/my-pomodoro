import { memo } from "react";

const TotalCompletedPomodorosCount = memo(({ totalCompletedPomodoros }) => {
  return <div>{`#${totalCompletedPomodoros}`}</div>;
});

export default TotalCompletedPomodorosCount;
