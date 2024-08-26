document.addEventListener('DOMContentLoaded', function () {
  const dashboardDiv = document.getElementById('dashboard');
  const exportButton = document.getElementById('export-csv');

  displayDashboard();

  exportButton.addEventListener('click', exportCSV);

  function displayDashboard() {
    chrome.storage.local.get(['workHours'], (result) => {
      const workHours = result.workHours || {};
      const today = new Date();
      const past14Days = Object.keys(workHours)
        .filter(date => (new Date(date) >= new Date(today.setDate(today.getDate() - 14))))
        .sort((a, b) => new Date(a) - new Date(b));

      let dashboardContent = '<table><tr><th>Date</th><th>Time Worked</th><th>Action</th></tr>';
      past14Days.forEach(date => {
        dashboardContent += `<tr>
          <td>${date}</td>
          <td id="time-${date}">${formatTime(workHours[date])}</td>
          <td><button class="edit-button" data-date="${date}">Edit</button></td>
        </tr>`;
      });
      dashboardContent += '</table>';
      dashboardDiv.innerHTML = dashboardContent;

      document.querySelectorAll('.edit-button').forEach(button => {
        button.addEventListener('click', () => {
          editEntry(button.dataset.date);
        });
      });
    });
  }

  function exportCSV() {
    chrome.storage.local.get(['workHours'], (result) => {
      const workHours = result.workHours || {};
      const today = new Date();
      const past14Days = Object.keys(workHours)
        .filter(date => (new Date(date) >= new Date(today.setDate(today.getDate() - 14))))
        .sort((a, b) => new Date(a) - new Date(b));

      let csvContent = 'Date,Time Worked\n';
      past14Days.forEach(date => {
        csvContent += `${date},${formatTime(workHours[date])}\n`;
      });

      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'work_hours.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  }

  function formatTime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}h ${m}m ${s}s`;
  }

  function editEntry(date) {
    const newHours = prompt("Enter hours worked:", "0");
    const newMinutes = prompt("Enter minutes worked:", "0");
    if (newHours !== null && newMinutes !== null) {
      const totalSeconds = (parseInt(newHours, 10) || 0) * 3600 + (parseInt(newMinutes, 10) || 0) * 60;
      updateWorkHours(date, totalSeconds);
    }
  }

  function updateWorkHours(date, seconds) {
    chrome.storage.local.get(['workHours'], (result) => {
      const workHours = result.workHours || {};
      workHours[date] = seconds;
      chrome.storage.local.set({ workHours }, () => {
        document.getElementById(`time-${date}`).textContent = formatTime(seconds);
      });
    });
  }
});
