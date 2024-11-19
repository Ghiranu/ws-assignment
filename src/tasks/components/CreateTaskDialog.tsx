import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React from "react";
import useModifyTaskDetails from "../containers/useModifyTaskDetails";
import { TaskType } from "../types/task-type.type";
import { DATE_FORMAT } from "../../utils/constants";
import TaskActionButtons from "./TaskActionButtons";
import TaskFormFields from "./TaskFormFields";

type CreateTaskDialogProps = {
  open: boolean;
  handleToggleCreateTaskDialog: () => void;
  handleAddNewTask: (taskDetails: TaskType) => void;
};

const CreateTaskDialog: React.FC<CreateTaskDialogProps> = ({
  open,
  handleToggleCreateTaskDialog,
  handleAddNewTask,
}) => {
  const {
    taskTitle,
    taskCreatedAt,
    taskDescription,
    handleChangeTaskCreatedAt,
    handleChangeTaskDescription,
    handleChangeTaskTitle,
    handleClearTaskDetails,
  } = useModifyTaskDetails();

  const handleCancelAddTask = () => {
    handleToggleCreateTaskDialog();
    handleClearTaskDetails();
  };

  const handleCreateTask = () => {
    handleAddNewTask({
      title: taskTitle || "",
      description: taskDescription || "",
      createdAt: taskCreatedAt?.format(DATE_FORMAT) || "",
      id: window.crypto.randomUUID(),
    });
    handleToggleCreateTaskDialog();
    handleClearTaskDetails();
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        sx={{ padding: "24px", height: "auto" }}
        onClose={handleCancelAddTask}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Add new task</DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            paddingTop: "8px !important",
            flexDirection: "column",
            gap: "16px",
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
        </DialogContent>
        <DialogActions>
          <TaskActionButtons
            handleOnSave={handleCreateTask}
            handleOnCancel={handleCancelAddTask}
          />
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default CreateTaskDialog;
