const MIN_MINUTES = 1;
const MAX_MINUTES = 60;
const decBtn = document.getElementById('time-decrease');
const incBtn = document.getElementById('time-increase');
const meditateBtn = document.getElementById('btn-submit');
const audio = document.getElementById('audio');
const audioBell = document.getElementById('audio-bell');
const timeValue = document.getElementById('time');

const timerForm = document.getElementById('timer-form');
const countdownContainer = document.getElementById('countdown');
const countdownResetBtn = document.getElementById('countdown-reset-btn');
// SetInterval variable
let meditationActive;
// In Minutes
let currentTimeValue = parseInt(timeValue.getAttribute('value'));
// Convert to seconds
let currentTimeValueInSeconds = currentTimeValue * 60;

function getCurrentTimeInSeconds() {
  return currentTimeValue * 60;
}


function validateTimeValue(value) {
  const newTimeValue = parseInt(timeValue.getAttribute('value')) + value;
  return newTimeValue >= MIN_MINUTES && newTimeValue <= MAX_MINUTES;
}

function adjustTime(value) {
  if(validateTimeValue(value)) {
    currentTimeValue += value;
    timeValue.setAttribute('value', currentTimeValue);
    timeValue.innerText = currentTimeValue;
  }
}

function resetTime() {
  timeValue.setAttribute('value', currentTimeValue);
  timeValue.innerText = currentTimeValue;
}

function countdownTimer() {
  updateTimeDisplay(currentTimeValueInSeconds);
  if (currentTimeValueInSeconds <= 0) {
    clearInterval(meditationActive);
    audioBell.play();
    unhide(countdownResetBtn);
  }
  currentTimeValueInSeconds--;
}

function startMeditate() {
  if(audio.paused) {audio.play();}
  currentTimeValueInSeconds = getCurrentTimeInSeconds();
  updateTimeDisplay(currentTimeValueInSeconds);
  meditationActive = setInterval(countdownTimer, 1000);
  removeClass(timerForm, 'timer-form');
  hide(timerForm);
  unhide(countdownContainer);
}

function resetMeditation() {
  addClass(timerForm, 'timer-form');
  unhide(timerForm);
  hide(countdownContainer);
  hide(countdownResetBtn);
  resetTime();
}

decBtn.addEventListener('click', () => adjustTime(-1));
incBtn.addEventListener('click', () => adjustTime(1));
meditateBtn.addEventListener('click', startMeditate);
countdownResetBtn.addEventListener('click', resetMeditation);