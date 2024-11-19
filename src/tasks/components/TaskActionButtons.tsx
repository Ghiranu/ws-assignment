import { Button } from "@mui/material";
import React from "react";

type TaskActionButtonsProps = {
  handleOnSave: () => void;
  handleOnCancel: () => void;
};

const TaskActionButtons: React.FC<TaskActionButtonsProps> = ({
  handleOnSave,
  handleOnCancel,
}) => {
  return (
    <>
      <Button variant="contained" onClick={handleOnSave}>
        Save
      </Button>
      <Button variant="contained" color="error" onClick={handleOnCancel}>
        Cancel
      </Button>
    </>
  );
};

export default TaskActionButtons;
