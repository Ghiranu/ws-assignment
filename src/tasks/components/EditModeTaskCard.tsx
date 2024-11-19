import { Box, CardContent } from "@mui/material";
import dayjs from "dayjs";
import { TaskType } from "../types/task-type.type";
import useModifyTaskDetails from "../containers/useModifyTaskDetails";
import { DATE_FORMAT } from "../../utils/constants";
import TaskActionButtons from "./TaskActionButtons";
import TaskFormFields from "./TaskFormFields";

type EditModeTaskCardProps = {
  isEditModeEnabled?: boolean;
  handleToggleEditMode: () => void;
  handleUpdateTask: (taskDetails: TaskType) => void;
} & TaskType;

const EditModeTaskCard: React.FC<EditModeTaskCardProps> = ({
  id,
  title,
  description,
  createdAt,
  handleToggleEditMode,
  handleUpdateTask,
}) => {
  const {
    taskTitle,
    taskCreatedAt,
    taskDescription,
    handleChangeTaskCreatedAt,
    handleChangeTaskDescription,
    handleChangeTaskTitle,
  } = useModifyTaskDetails(title, description, dayjs(createdAt, DATE_FORMAT));

  const handleModifyTaskDetails = () => {
    handleUpdateTask({
      title: taskTitle || "",
      description: taskDescription || "",
      createdAt: taskCreatedAt?.format(DATE_FORMAT) || "",
      id,
    });
    handleToggleEditMode();
  };

  return (
    <CardContent
      sx={{
        padding: 0,
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        width: "400px",
      }}
    >
      <TaskFormFields
        taskTitle={taskTitle}
        taskCreatedAt={taskCreatedAt}
        taskDescription={taskDescription}
        handleChangeTaskCreatedAt={handleChangeTaskCreatedAt}
        handleChangeTaskDescription={handleChangeTaskDescription}
        handleChangeTaskTitle={handleChangeTaskTitle}
      />
      <Box sx={{ marginLeft: "auto", gap: "16px", display: "flex" }}>
        <TaskActionButtons
          handleOnSave={handleModifyTaskDetails}
          handleOnCancel={handleToggleEditMode}
        />
      </Box>
    </CardContent>
  );
};

export default EditModeTaskCard;
