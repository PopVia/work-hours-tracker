chrome.runtime.onInstalled.addListener(() => {
  // Generate a list of project objectsa
  // Project schema
  // { id, startTimeDate , title, description, duration, isActive? }
  // Store the projects array in Chrome's sync storage
  chrome.storage.sync.set({ projects: [] }, () => {
    console.log("Projects have been saved to Chrome storage.");
  });
});
