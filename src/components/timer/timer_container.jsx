import React from "react";
import "./timer_container.css";

// current project...?

export const TimerContainer = () => {
  const activeProject = "activeProject";
  const activeprojectDesc = "Project description";

  return (
    <div className="center-content">
      <div className="timer-container">
        <div className="project-information">
          <h3 className="project-title">Project: {activeProject}</h3>
          <p className="project-desc">Description: {activeprojectDesc} </p>
        </div>
        <div className="timer-card">
          <div className="timer">
            <div className="timer-txt">00:00:00</div>
          </div>
          <div className="timer-management-btns">
            <span class="btn-play material-symbols-outlined">play_circle</span>
            <span class="btn-pause material-symbols-outlined">
              pause_circle
            </span>
            <span class="btn-stop material-symbols-outlined">stop_circle</span>
          </div>
        </div>
        <button className="new-project-btn">Start new project</button>
      </div>
    </div>
  );
};
