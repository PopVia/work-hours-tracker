import React, { useState } from "react";
import "./create_project_form.css";

export const ManualEntryForm = ({ onSubmit }) => {
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectStartTime, setProjectStartTime] = useState();
  const [projectHours, setProjectHours] = useState();
  const [projectMinutes, setProjectMinutes] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();

    const projectDuration =
      parseInt(projectHours) * 3600 + parseInt(projectMinutes) * 60;

    const startTime = new Date(projectStartTime).getTime();
    console.log(startTime);

    chrome.storage.sync.get(["projects"], (result) => {
      const existingProjects = result.projects || [];
      const newProject = {
        id: new Date().getTime(),
        title: projectTitle,
        description: projectDescription,
        startTime: startTime,
        duration: projectDuration,
        isActive: false,
      };
      const updatedProjects = [...existingProjects, newProject];
      chrome.storage.sync.set({ projects: updatedProjects });
    });

    onSubmit();
  };

  return (
    <div className="project-form">
      <form onSubmit={handleSubmit}>
        <div className="form-column">
          <div className="form-item">
            <h3 className="form-item-title">Project Title</h3>
            <input
              className="form-field"
              required={true}
              type="text"
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
            />
          </div>

          <div className="form-item">
            <h3 className="form-item-title">Project Description</h3>
            <textarea
              className="form-field-lg"
              required={true}
              type="text"
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
            />
          </div>

          <div className="form-item">
            <h3 className="form-item-title">Project Start Time</h3>
            <input
              className="form-field"
              required={true}
              type="date"
              value={projectStartTime}
              onChange={(e) => setProjectStartTime(e.target.value)}
            />
          </div>

          <div className="form-item">
            <h3 className="form-item-title">Duration (Hours & Minutes)</h3>
            <div className="duration-inputs">
              <input
                className="form-field"
                required={true}
                type="number"
                min="0"
                value={projectHours}
                onChange={(e) => setProjectHours(e.target.value)}
                placeholder="Hours"
              />
              <input
                className="form-field"
                required={true}
                type="number"
                min="0"
                max="59"
                value={projectMinutes}
                onChange={(e) => setProjectMinutes(e.target.value)}
                placeholder="Minutes"
              />
            </div>
          </div>

          <button className="submit-btn" type="submit">
            Add Entry
          </button>
        </div>
      </form>
    </div>
  );
};
