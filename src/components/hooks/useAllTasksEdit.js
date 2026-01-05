import { useState, useRef, useEffect } from "react";

export const useAllTasksEdit = (tasksList, setTasksList) => {
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

  const onClearFinishedTasks = () => {
    onAllTasksEditSectionModalClose();

    if (tasksList.length === 0) {
      return;
    }

    const allUnfinishedTasks = tasksList
      .filter((task) => !task.checked)
      .map((task) => task);

    setTasksList(allUnfinishedTasks);
  };

  const onClearAllTasks = () => {
    onAllTasksEditSectionModalClose();

    if (tasksList.length === 0) {
      return;
    }

    setTasksList([]);
  };

  return {
    showAllTasksSectionEditModal,
    onClearFinishedTasks,
    onClearAllTasks,
    onAllTasksSectionEdit,
    allTasksEditSectionModalRef,
  };
};
