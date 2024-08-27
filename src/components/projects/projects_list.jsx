import React, { useState, useEffect } from "react";
import "./projects.css";

const ProjectItem = ({ project }) => {
  const { id, title, description, startTime, duration } = project;
  return (
    <div className="project-item-container">
      <div>
        <h3 className="project-title">{title}</h3>
        <h3 className="project-desc">{description}</h3>
      </div>
      <h3 className="divider-txt">00:00:00</h3>
    </div>
  );
};

// This weeks projects
// Quick access tab of today's tasks
// Secondary quick access to restart yesterday's tasks

export const ProjectsList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    chrome.storage.sync.get(["projects"]).then((results) => {
      setProjects(results.projects);
    });
  }, []);

  return (
    <div className="projects-list">
      <div className="timeframe-divider">
        <h3 className="divider-txt">This Week</h3>
        <h3 className="divider-txt">14 HR 38 MIN</h3>
      </div>
      <div className="timeframe-divider-sm">
        <h3 className="divider-sm-txt">Today</h3>
        <h3 className="divider-sm-txt">4 HR 30 MIN</h3>
      </div>
      {projects.map((project) => {
        return <ProjectItem project={project}></ProjectItem>;
      })}
      <div className="timeframe-divider">
        <h3 className="divider-txt">Yesterday</h3>
        <h3 className="divider-txt">3 HR 18 MIN</h3>
      </div>
      {projects.map((project) => {
        return <ProjectItem project={project}></ProjectItem>;
      })}
    </div>
  );
};
