import React, { useState } from "react";
import { Card } from "@mui/material";

import EditModeTaskCard from "./EditModeTaskCard";
import ReadOnlyTaskCard from "./ReadOnlyTaskCard";
import { TaskType } from "../types/task-type.type";

type TaskCardProps = {
  id: string;
  title: string;
  createdAt: string;
  description: string;
  handleDeleteTask: (taskId: string) => void;
  handleUpdateTask: (taskDetails: TaskType) => void;
};

const TaskCard: React.FC<TaskCardProps> = ({
  id,
  title,
  createdAt,
  description,
  handleDeleteTask,
  handleUpdateTask,
}) => {
  const [isEditModeEnabled, setIsEditModeEnabled] = useState(false);

  const handleToggleEditMode = () =>
    setIsEditModeEnabled((previousValue) => !previousValue);

  return (
    <Card
      sx={{
        padding: 2,
        borderRadius: 2,
        boxShadow: 1,
        maxWidth: 400,
        margin: "auto",
      }}
    >
      {isEditModeEnabled ? (
        <EditModeTaskCard
          id={id}
          handleUpdateTask={handleUpdateTask}
          handleToggleEditMode={handleToggleEditMode}
          title={title}
          description={description}
          createdAt={createdAt}
        />
      ) : (
        <ReadOnlyTaskCard
          id={id}
          handleDeleteTask={handleDeleteTask}
          handleToggleEditMode={handleToggleEditMode}
          title={title}
          description={description}
          createdAt={createdAt}
        />
      )}
    </Card>
  );
};

export default TaskCard;
