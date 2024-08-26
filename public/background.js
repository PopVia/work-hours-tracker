chrome.runtime.onInstalled.addListener(() => {
  // Generate a list of project objects
  const projects = [
    {
      id: 123, // Unique ID
      title: "Project 1",
      description: "Description for Project 1",
      startTime: new Date().toISOString(), // Start time as ISO string
      duration: 0, // Initial duration in seconds
    },
    {
      id: 234, // Unique ID
      title: "Project 2",
      description: "Description for Project 2",
      startTime: new Date().toISOString(),
      duration: 0,
    },
    // Add more projects as needed
  ];

  // Store the projects array in Chrome's sync storage
  chrome.storage.sync.set({ projects }, () => {
    console.log("Projects have been saved to Chrome storage.");
  });
});
