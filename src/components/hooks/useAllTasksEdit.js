import { useState, useRef, useEffect } from "react";
import {
  deleteTask,
  getAllTasks,
  deleteActiveTask,
} from "../../db/indexedDb.js";

export const useAllTasksEdit = (
  tasksList,
  setTasksList,
  setTaskTitleHeading
) => {
  const [showAllTasksSectionEditModal, setshowAllTasksSectionEditModal] =
    useState(false);

  const allTasksEditSectionModalRef = useRef(null);

  const onAllTasksEditSectionModalClose = () => {
    setshowAllTasksSectionEditModal(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        allTasksEditSectionModalRef.current &&
        !allTasksEditSectionModalRef.current.contains(e.target)
      ) {
        onAllTasksEditSectionModalClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onAllTasksEditSectionModalClose]);

  const onAllTasksSectionEdit = () => {
    setshowAllTasksSectionEditModal((prevState) => !prevState);
  };

  const onClearFinishedTasks = async () => {
    onAllTasksEditSectionModalClose();

    if (tasksList.length === 0) {
      return;
    }

    const finishedTasks = tasksList
      .filter((task) => task.checked)
      .map((task) => task);

    await deleteTasks(finishedTasks);

    setTasksList(await getAllTasks());
  };

  const onClearAllTasks = async () => {
    onAllTasksEditSectionModalClose();

    if (tasksList.length === 0) {
      return;
    }

    await Promise.all([deleteActiveTask(), deleteTasks(tasksList)]);
    setTasksList([]);
    setTaskTitleHeading("Time to focus now");
  };

  const deleteTasks = async (tasks) => {
    try {
      await Promise.all(tasks.map((task) => deleteTask(task.id)));
      setTasksList([]);
    } catch (error) {
      alert("Failed to delete all tasks", error);
    }
  };

  return {
    showAllTasksSectionEditModal,
    onClearFinishedTasks,
    onClearAllTasks,
    onAllTasksSectionEdit,
    allTasksEditSectionModalRef,
  };
};
