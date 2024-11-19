import React from "react";
import { Box, CardContent, IconButton, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { TaskType } from "../types/task-type.type";

type TaskCardProps = {
  handleDeleteTask: (taskId: string) => void;
  handleToggleEditMode: () => void;
} & TaskType;

const ReadOnlyTaskCard: React.FC<TaskCardProps> = ({
  id,
  title,
  createdAt,
  description,
  handleDeleteTask,
  handleToggleEditMode,
}) => {
  return (
    <CardContent sx={{ padding: 0 }}>
      <Box display={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <Typography variant="subtitle1" fontWeight="bold">
          {title}
        </Typography>
        <Box sx={{ marginLeft: "auto" }}>
          <IconButton onClick={handleToggleEditMode}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDeleteTask(id)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ fontSize: "12px", fontStyle: "italic" }}
      >
        {createdAt}
      </Typography>

      <Typography variant="body2" color="text.secondary" mt={1}>
        {description}
      </Typography>
    </CardContent>
  );
};

export default ReadOnlyTaskCard;
