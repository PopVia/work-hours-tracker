document.addEventListener('DOMContentLoaded', function () {
  const startButton = document.getElementById('start-timer');
  const stopButton = document.getElementById('stop-timer');
  const addEntryButton = document.getElementById('add-entry');
  const viewDashboardButton = document.getElementById('view-dashboard');
  const entryDate = document.getElementById('entry-date');
  const entryHours = document.getElementById('entry-hours');
  const entryMinutes = document.getElementById('entry-minutes');
  const messageDiv = document.getElementById('message');
  const timerDisplay = document.getElementById('timer-display');

  let startTime;
  let timerInterval;

  startButton.addEventListener('click', () => {
    startTime = new Date();
    startButton.disabled = true;
    stopButton.disabled = false;

    timerInterval = setInterval(updateTimerDisplay, 1000);
  });

  stopButton.addEventListener('click', () => {
    clearInterval(timerInterval);
    const endTime = new Date();
    const timeWorked = Math.floor((endTime - startTime) / 1000); // time in seconds
    const date = startTime.toISOString().split('T')[0];

    addWorkHours(date, timeWorked);

    startButton.disabled = false;
    stopButton.disabled = true;
    timerDisplay.textContent = '0h 0m 0s';
    showMessage(`Added ${formatTime(timeWorked)} for ${date}`);
  });

  addEntryButton.addEventListener('click', () => {
    const date = entryDate.value;
    const hours = parseInt(entryHours.value, 10) || 0;
    const minutes = parseInt(entryMinutes.value, 10) || 0;
    const totalSeconds = (hours * 3600) + (minutes * 60);

    if (date && !isNaN(totalSeconds)) {
      addWorkHours(date, totalSeconds);
      showMessage(`Added ${formatTime(totalSeconds)} for ${date}`);
    } else {
      showMessage('Please enter a valid date and time.');
    }
  });

  viewDashboardButton.addEventListener('click', () => {
    chrome.tabs.create({ url: chrome.runtime.getURL("dashboard.html") });
  });

  function addWorkHours(date, seconds) {
    chrome.storage.local.get(['workHours'], (result) => {
      const workHours = result.workHours || {};
      if (workHours[date]) {
        workHours[date] += seconds;
      } else {
        workHours[date] = seconds;
      }
      chrome.storage.local.set({ workHours });
    });
  }

  function formatTime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}h ${m}m ${s}s`;
  }

  function updateTimerDisplay() {
    const elapsedSeconds = Math.floor((new Date() - startTime) / 1000);
    timerDisplay.textContent = formatTime(elapsedSeconds);
  }

  function showMessage(message) {
    messageDiv.textContent = message;
    setTimeout(() => { messageDiv.textContent = ''; }, 3000);
  }
});
