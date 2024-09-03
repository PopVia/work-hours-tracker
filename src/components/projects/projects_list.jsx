import React, { useState, useEffect } from "react";
import {
  formatSecondsToTimerView,
  formatSecondsToSummaryView,
} from "../timer/format_times";
import "./projects.css";

const ProjectItem = ({ project }) => {
  const { id, title, description, startTime, duration } = project;
  return (
    <div className="project-item-container">
      <div>
        <h3 className="project-title">{title}</h3>
        <h3 className="project-desc">{description}</h3>
      </div>
      <div className="mini-timer">
        <span id="playing" className={`material-symbols-outlined`}>
          play_arrow
        </span>
        <h3 className="divider-txt">{formatSecondsToTimerView(duration)}</h3>
      </div>
    </div>
  );
};

const categorizeProjects = (projects) => {
  const now = new Date();
  const startOfToday = new Date(now.setHours(0, 0, 0, 0));
  const endOfToday = new Date(startOfToday);
  endOfToday.setHours(23, 59, 59, 999);

  const startOfYesterday = new Date(startOfToday);
  startOfYesterday.setDate(startOfToday.getDate() - 1);

  const endOfYesterday = new Date(startOfYesterday);
  endOfYesterday.setHours(23, 59, 59, 999);

  const startOfWeek = new Date(startOfToday);
  startOfWeek.setDate(startOfToday.getDate() - 7);

  return projects.reduce(
    (acc, project) => {
      const startTime = new Date(project.startTime);
      console.log(startOfToday);
      console.log("Project", project);
      console.log(startTime instanceof Date);
      console.log(startTime);
      if (startTime >= startOfToday && startTime <= endOfToday) {
        acc.today.push(project);
      } else if (startTime >= startOfYesterday && startTime <= endOfYesterday) {
        acc.yesterday.push(project);
      }

      if (startTime >= startOfWeek && startTime < endOfYesterday) {
        acc.earlierThisWeek.push(project);
      }
      return acc;
    },
    {
      today: [],
      earlierThisWeek: [],
      yesterday: [],
    }
  );
};

export const ProjectsList = () => {
  const [projects, setProjects] = useState([]);
  const [categorizedProjects, setCategorizedProjects] = useState({
    today: [],
    earlierThisWeek: [],
    yesterday: [],
  });

  const handleProjectsUpdate = (changes) => {
    if (changes.projects) {
      const newProjects = changes.projects.newValue;
      setProjects(newProjects);
      const newCategorizedProjects = categorizeProjects(newProjects);
      setCategorizedProjects(newCategorizedProjects);
    }
  };

  useEffect(() => {
    chrome.storage.sync.get(["projects"]).then((results) => {
      const fetchedProjects = results.projects || [];
      setProjects(fetchedProjects);
      setCategorizedProjects(categorizeProjects(fetchedProjects));
    });
    chrome.storage.onChanged.addListener(handleProjectsUpdate);

    return () => {
      chrome.storage.onChanged.removeListener(handleProjectsUpdate);
    };
  }, []);

  // Helper function to calculate total duration in seconds for each category
  const calculateTotalDuration = (projects) => {
    return projects.reduce((total, project) => total + project.duration, 0);
  };

  // Calculate durations
  const todayDuration = calculateTotalDuration(categorizedProjects.today);
  const earlierThisWeekDuration = calculateTotalDuration(
    categorizedProjects.earlierThisWeek
  );
  const yesterdayDuration = calculateTotalDuration(
    categorizedProjects.yesterday
  );

  return (
    <div className="projects-list">
      <div className="timeframe-divider">
        <h3 className="divider-txt">This Week</h3>
        <h3 className="divider-txt">
          {formatSecondsToSummaryView(earlierThisWeekDuration + todayDuration)}
        </h3>
      </div>
      <div className="timeframe-divider-sm">
        <h3 className="divider-sm-txt">Today</h3>
        <h3 className="divider-sm-txt">
          {formatSecondsToSummaryView(todayDuration)}
        </h3>
      </div>
      <ul className="scrollable-list">
        {categorizedProjects.today.map((project) => (
          <ProjectItem key={project.id} project={project} />
        ))}
      </ul>

      <div className="timeframe-divider-sm">
        <h3 className="divider-sm-txt">Earlier This Week</h3>
        <h3 className="divider-sm-txt">
          {formatSecondsToSummaryView(earlierThisWeekDuration)}
        </h3>
      </div>
      <ul className="scrollable-list">
        {categorizedProjects.earlierThisWeek.map((project) => (
          <ProjectItem key={project.id} project={project} />
        ))}
      </ul>

      <div className="timeframe-divider">
        <h3 className="divider-txt">Yesterday</h3>
        <h3 className="divider-txt">
          {formatSecondsToSummaryView(yesterdayDuration)}
        </h3>
      </div>
      <ul className="scrollable-list">
        {categorizedProjects.yesterday.map((project) => (
          <ProjectItem key={project.id} project={project} />
        ))}
      </ul>
    </div>
  );
};
