const secondsDisplay = document.getElementById('seconds');
const minutesDisplay = document.getElementById('minutes');

function updateTimeDisplay(currentTime) {
  const seconds = Math.floor(currentTime%60);
  const minutes = Math.floor(currentTime/60);
  secondsDisplay.innerText = seconds;
  minutesDisplay.innerText = minutes;
}