import TaskCard from "./TaskCard";
import Box from "@mui/material/Box";
import { Button, Stack, TextField, Typography } from "@mui/material";
import CreateTaskDialog from "./CreateTaskDialog";
import useTaskList from "../containers/useTaskList";
import SwapVertIcon from "@mui/icons-material/SwapVert";

const TaskList = () => {
  const {
    taskList,
    open,
    searchedTitle,
    areTaskCreated,
    setSearchedTitle,
    handleToggleCreateTaskDialog,
    handleAddNewTask,
    handleDeleteTask,
    handleUpdateTask,
    handleToggleSortOrder,
  } = useTaskList();

  return (
    <>
      <CreateTaskDialog
        open={open}
        handleAddNewTask={handleAddNewTask}
        handleToggleCreateTaskDialog={handleToggleCreateTaskDialog}
      />
      <Stack gap="16px" alignItems="center">
        <Button
          onClick={handleToggleCreateTaskDialog}
          sx={{ width: "160px" }}
          variant="contained"
        >
          Add task
        </Button>
        <Button
          startIcon={<SwapVertIcon />}
          onClick={handleToggleSortOrder}
          variant="contained"
        >
          Sort task by date
        </Button>
        <TextField
          sx={{ width: "400px" }}
          value={searchedTitle}
          label="Search task by title"
          onChange={(event) => setSearchedTitle(event.target.value)}
        />
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "18px",
            padding: " 48px",
          }}
        >
          {areTaskCreated ? (
            taskList.map((task) => {
              return (
                <TaskCard
                  handleUpdateTask={handleUpdateTask}
                  handleDeleteTask={handleDeleteTask}
                  key={task.id}
                  id={task.id}
                  title={task.title}
                  createdAt={task.createdAt}
                  description={task.description}
                />
              );
            })
          ) : (
            <Typography>No tasks found</Typography>
          )}
        </Box>
      </Stack>
    </>
  );
};

export default TaskList;
