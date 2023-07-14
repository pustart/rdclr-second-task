import { DEFAULT_BREAK_INTERVAL, DEFAULT_POMODORO, DEFAULT_LONG_BREAK, DEFAULT_SHORT_BREAK } from "./constants.js";
import Timer from "./timer.js";
import Modal from './modal.js';

const settingsModal = new Modal("settings-modal");

document.getElementById('open-settings-btn').addEventListener('click', () => {
  settingsModal.openModal();
});

const pomodoro = document.getElementById("pomodoroInput");
const shortBreak = document.getElementById("shortBreakInput");
const longBreak = document.getElementById("longBreakInput");

const timer = new Timer(parseInt(pomodoro.value, 10), parseInt(shortBreak.value, 10), parseInt(longBreak.value, 10), DEFAULT_BREAK_INTERVAL);
window.timer = timer;

document.querySelector('.settings-modal-form').addEventListener('submit', handleSettingsSubmit);
document.getElementById("default-settings-btn").addEventListener('click', handleDefaultSettings);

function handleSettingsSubmit(event) {
  event.preventDefault();

  const pomodoroInput = document.getElementById("pomodoroInput");
  const shortBreakInput = document.getElementById("shortBreakInput");
  const longBreakInput = document.getElementById("longBreakInput");

  const pomodoroValue = parseInt(pomodoroInput.value, 10);
  const shortBreakValue = parseInt(shortBreakInput.value, 10);
  const longBreakValue = parseInt(longBreakInput.value, 10);

  timer.pomodoro = pomodoroValue;
  timer.shortBreak = shortBreakValue;
  timer.longBreak = longBreakValue;

  timer.resetTimer();
  settingsModal.closeModal();
}

function handleDefaultSettings() {
  timer.pomodoro = DEFAULT_POMODORO;
  timer.shortBreak = DEFAULT_SHORT_BREAK;
  timer.longBreak = DEFAULT_LONG_BREAK;

  pomodoro.value = DEFAULT_POMODORO;
  shortBreak.value = DEFAULT_SHORT_BREAK;
  longBreak.value = DEFAULT_LONG_BREAK;

  timer.resetTimer();
}
