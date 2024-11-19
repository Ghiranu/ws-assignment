import { TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { DATE_FORMAT } from "../../utils/constants";

type TaskFormFieldsProps = {
  taskTitle: string;
  taskDescription: string;
  taskCreatedAt?: dayjs.Dayjs | null;
  handleChangeTaskTitle: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeTaskCreatedAt: (event: dayjs.Dayjs | null) => void;
  handleChangeTaskDescription: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
};

const TaskFormFields: React.FC<TaskFormFieldsProps> = ({
  taskTitle,
  taskDescription,
  taskCreatedAt,
  handleChangeTaskCreatedAt,
  handleChangeTaskDescription,
  handleChangeTaskTitle,
}) => {
  return (
    <>
      <TextField
        value={taskTitle}
        label="Title"
        onChange={handleChangeTaskTitle}
      />
      <DatePicker
        format={DATE_FORMAT}
        label="Created at"
        value={taskCreatedAt}
        onChange={handleChangeTaskCreatedAt}
      />
      <TextField
        multiline
        value={taskDescription}
        label="Description"
        onChange={handleChangeTaskDescription}
      />
    </>
  );
};

export default TaskFormFields;
