import React, { act, useEffect, useState } from "react";
import { Modal } from "../common/modal";
import { CreatProjectForm } from "../projects/create_project_form";
import { formatSecondsToTimerView } from "./format_times";
import "./timer_container.css";

export const TimerContainer = () => {
  const [activeProject, setActiveProject] = useState();
  // total work duration in seconds
  const [timer, setTimer] = useState(activeProject?.duration ?? 0);
  // Either playing, paused, stopped &(save)
  // Status behavior, playing: timer is running, paused: timer is paused, active project still exists, user can restart or STOP.
  const [timerStatus, setTimerStatus] = useState("paused");
  const [modalOpen, setModalOpen] = useState(false);
  const handleToggleModal = () => {
    setModalOpen((prev) => {
      return !prev;
    });
  };
  const updateProjectDuration = () => {};

  const manageTimer = (e) => {
    if (e.target.id === "playing" && !activeProject) {
      handleToggleModal();
      return;
    }
    if (e.target.id !== timerStatus) {
      setTimerStatus(e.target.id);
    }
    if (e.target.id === "stopped" || e.target.id === "paused") {
      chrome.storage.sync.get(["projects"], (result) => {
        const existingProjects = result.projects || [];

        const projectIndex = existingProjects.findIndex(
          (project) => project.id === activeProject.id
        );

        if (projectIndex !== -1) {
          existingProjects[projectIndex].duration = timer;
          chrome.storage.sync.set({ projects: existingProjects });
        }
      });
      if (e.target.id == "stopped") {
        setActiveProject();
        setTimer(0);
      }
    }
  };

  useEffect(() => {
    let timeInterval;
    if (timerStatus == "playing") {
      timeInterval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(timeInterval);
    }
    return () => {
      clearInterval(timeInterval);
    };
  }, [activeProject, timerStatus]);

  return (
    <div className="center-content">
      {modalOpen && (
        <Modal headerContent={"Create New Project"} onClose={handleToggleModal}>
          <CreatProjectForm
            onSubmit={() => {
              handleToggleModal();
              setTimerStatus("playing");
            }}
            makeActiveProject={setActiveProject}
          ></CreatProjectForm>
        </Modal>
      )}
      <div className="timer-container">
        <div className="project-information">
          <h3 className="project-title">Project: {activeProject?.title}</h3>
          <p className="project-desc">
            Description: {activeProject?.description}
          </p>
        </div>
        <div className="timer-card">
          <div className="timer">
            <div className="timer-txt">{formatSecondsToTimerView(timer)}</div>
          </div>
          <div className="timer-management-btns">
            <span
              id="playing"
              className={`btn-play material-symbols-outlined ${
                timerStatus === "playing" ? "greyed-out" : ""
              }`}
              onClick={manageTimer}
            >
              play_arrow
            </span>
            <span
              id="paused"
              className={`btn-pause material-symbols-outlined ${
                timerStatus !== "playing" || !activeProject ? "greyed-out" : ""
              }`}
              onClick={manageTimer}
            >
              pause
            </span>
            <span
              id="stopped"
              className={`btn-stop material-symbols-outlined ${
                timerStatus === "stopped" || !activeProject ? "greyed-out" : ""
              }`}
              onClick={manageTimer}
            >
              stop
            </span>
          </div>
        </div>
        <button className="new-project-btn" onClick={handleToggleModal}>
          Start new project
        </button>
      </div>
    </div>
  );
};
