import React, { useEffect, useMemo, useState } from "react";
import { TaskType } from "../types/task-type.type";
import dayjs from "dayjs";
import {
  CURRENT_USER_LOCAL_STORAGE_KEY_NAME,
  DATE_FORMAT,
  TASK_LOCAL_STORAGE_KEY_NAME,
  ASCENDING_SORT_NAME,
  DESCENDING_SORT_NAME,
} from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import { SortDirections } from "../types/sort-directions.type";

const useTaskList = () => {
  const [taskList, setTaskList] = useState<TaskType[]>([]);
  const [searchedTitle, setSearchedTitle] = useState("");
  const [open, setOpen] = React.useState(false);
  const [sortOrder, setSortOrder] =
    useState<SortDirections>(ASCENDING_SORT_NAME);

  const localStorageTasks = localStorage.getItem(TASK_LOCAL_STORAGE_KEY_NAME);

  const handleDeleteTask = (taskId: string) => {
    const filteredTasks = taskList.filter((task) => task.id !== taskId);
    setTaskList(filteredTasks);
    localStorage.setItem(
      TASK_LOCAL_STORAGE_KEY_NAME,
      JSON.stringify(filteredTasks)
    );
  };

  const handleUpdateTask = (taskDetails: TaskType) => {
    const taskIndex = taskList.findIndex((task) => task.id == taskDetails.id);

    const updatedTasks = taskList.map((task, index) => {
      return index === taskIndex ? { ...taskDetails } : task;
    });

    setTaskList(updatedTasks);
    localStorage.setItem(
      TASK_LOCAL_STORAGE_KEY_NAME,
      JSON.stringify(updatedTasks)
    );
  };

  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = localStorage.getItem(
      CURRENT_USER_LOCAL_STORAGE_KEY_NAME
    );
    const isUserNotDefined = currentUser === null;

    if (isUserNotDefined) {
      navigate("/");
    }
  });

  useEffect(() => {
    if (localStorageTasks !== null) {
      const tasks = JSON?.parse(localStorageTasks) as TaskType[];
      const sortedTasks = tasks.sort((a, b) => {
        const dateA = dayjs(a.createdAt, DATE_FORMAT);
        const dateB = dayjs(b.createdAt, DATE_FORMAT);
        return dateA.diff(dateB);
      });
      setTaskList(sortedTasks);
    }
  }, [localStorageTasks]);

  const filteredTasks = useMemo(() => {
    return taskList.filter((task) =>
      task.title.toLowerCase().includes(searchedTitle.toLowerCase())
    );
  }, [searchedTitle, taskList]);

  const sortedTasks = filteredTasks.sort((a, b) => {
    const isAscendingDirection = sortOrder === ASCENDING_SORT_NAME;
    const dateA = dayjs(a.createdAt, DATE_FORMAT);
    const dateB = dayjs(b.createdAt, DATE_FORMAT);

    return isAscendingDirection ? dateA.diff(dateB) : dateB.diff(dateA);
  });

  const handleToggleSortOrder = () => {
    setSortOrder((previousDirection) => {
      const isAscendingDirection = previousDirection === ASCENDING_SORT_NAME;

      return isAscendingDirection ? DESCENDING_SORT_NAME : ASCENDING_SORT_NAME;
    });
  };

  const handleToggleCreateTaskDialog = () => {
    setOpen((previousValue) => !previousValue);
  };

  const handleAddNewTask = (taskDetails: TaskType) => {
    setTaskList((previousTasks) => {
      return [
        ...previousTasks,
        {
          ...taskDetails,
        },
      ];
    });
    localStorage.setItem(
      TASK_LOCAL_STORAGE_KEY_NAME,
      JSON.stringify([
        ...taskList,
        {
          ...taskDetails,
        },
      ])
    );
  };

  const areTaskCreated = filteredTasks.length > 0;

  return {
    areTaskCreated,
    taskList: sortedTasks,
    searchedTitle,
    open,
    setSearchedTitle,
    handleToggleSortOrder,
    handleToggleCreateTaskDialog,
    handleAddNewTask,
    handleDeleteTask,
    handleUpdateTask,
  };
};

export default useTaskList;
