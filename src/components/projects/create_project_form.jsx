import React, { useState } from "react";
import "./create_project_form.css";

export const CreatProjectForm = ({ onSubmit, makeActiveProject }) => {
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Retrieve the existing projects from Chrome's sync storage
    chrome.storage.sync.get(["projects"], (result) => {
      const existingProjects = result.projects || []; // Retrieve existing projects or initialize as an empty array

      // Create a new project object
      const newProject = {
        id: new Date().getTime(), // Use the current timestamp as a unique ID
        title: projectTitle,
        description: projectDescription,
        startTime: new Date().getTime(), // Set the current date and time
        duration: 0, // Initialize duration to zero
        isActive: true,
      };
      makeActiveProject(newProject);
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
              onChange={(e) => setProjectTitle(e.target.value)} // Use e.target.value to get the input value
            />
          </div>
          <div className="form-item">
            <h3 className="form-item-title">Project Description</h3>
            <textarea
              className="form-field-lg"
              required={true}
              type="text"
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)} // Use e.target.value to get the input value
            />
          </div>
          <button className="submit-btn" type="submit">
            Start New Project
          </button>
        </div>
      </form>
    </div>
  );
};
