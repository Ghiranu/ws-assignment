import dayjs from "dayjs";
import React, { useState } from "react";

const useModifyTaskDetails = (
  title: string = "",
  description: string = "",
  createdAt: dayjs.Dayjs | null = null
) => {
  const [taskTitle, setTaskTitle] = useState(title);
  const [taskDescription, setTaskDescription] = useState(description);
  const [taskCreatedAt, setTaskCreatedAt] = useState<
    dayjs.Dayjs | null | undefined
  >(createdAt);

  const handleChangeTaskTitle = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTaskTitle(event.target.value);
  };

  const handleChangeTaskDescription = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTaskDescription(event.target.value);
  };

  const handleChangeTaskCreatedAt = (event: dayjs.Dayjs | null) => {
    setTaskCreatedAt(event);
  };

  const handleClearTaskDetails = () => {
    setTaskCreatedAt(null);
    setTaskDescription("");
    setTaskTitle("");
  };

  return {
    taskTitle,
    taskDescription,
    taskCreatedAt,
    handleChangeTaskCreatedAt,
    handleChangeTaskDescription,
    handleChangeTaskTitle,
    handleClearTaskDetails,
  };
};

export default useModifyTaskDetails;
