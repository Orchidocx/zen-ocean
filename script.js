const MIN_MINUTES = 5;
const MAX_MINUTES = 10;
const decBtn = document.getElementById('time-decrease');
const incBtn = document.getElementById('time-increase');
const meditateBtn = document.getElementById('btn-submit');
const audio = document.getElementById('audio');
const timeValue = document.getElementById('time');

const timerForm = document.getElementById('timer-form');
const countdownContainer = document.getElementById('countdown');
// SetInterval variable
let meditationActive;
// In Minutes
let currentTimeValue = parseInt(timeValue.getAttribute('value'));
// Convert to seconds
let currentTimeValueInSeconds = currentTimeValue * 60;


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

function countdownTimer() {
  console.log(currentTimeValueInSeconds);
  updateTimeDisplay(currentTimeValueInSeconds);
  if (currentTimeValueInSeconds <= 0) {
    clearInterval(meditationActive);
    audio.pause();
    timerForm.classList.add('timer-form');
    timerForm.hidden = false;
  }
  currentTimeValueInSeconds--;
}

function startMeditate() {
  audio.play();
  updateTimeDisplay(currentTimeValueInSeconds);
  meditationActive = setInterval(countdownTimer, 1000);
  removeClass(timerForm, 'timer-form');
  hide(timerForm);
  unhide(countdownContainer);
}

decBtn.addEventListener('click', () => adjustTime(-1));
incBtn.addEventListener('click', () => adjustTime(1));
meditateBtn.addEventListener('click', startMeditate);