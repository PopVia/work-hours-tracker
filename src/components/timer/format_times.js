// returns string formatted as HH:MM:SS for the timer view.
export const formatSecondsToTimerView = (timeInSeconds) => {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = timeInSeconds % 60;

  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");

  console.log(hours, minutes, seconds);
  console.log(`${formattedHours}:${formattedMinutes}:${formattedSeconds}`);

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};

export const formatSecondsToSummaryView = (timeInSeconds) => {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);

  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");

  return `${formattedHours} Hours ${formattedMinutes} Minutes`;
};
