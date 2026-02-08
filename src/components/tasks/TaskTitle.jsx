import { memo } from "react";

const TaskTitle = memo(({ taskTitleHeading }) => {
  return <h1>{taskTitleHeading}</h1>;
});

export default TaskTitle;
