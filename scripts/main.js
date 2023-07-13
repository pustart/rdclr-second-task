import { DEFAULT_BREAK_INTERVAL, DEFAULT_POMODORO, DEFAULT_LONG_BREAK, DEFAULT_SHORT_BREAK } from "./constants.js";
import Timer from "./timer.js";
import Modal from './modal.js';

const settingsModal = new Modal("settings-modal");

document.querySelector('#open-settings-btn').addEventListener('click', () => {
  settingsModal.openModal();
});

const timer = new Timer(DEFAULT_POMODORO, DEFAULT_SHORT_BREAK, DEFAULT_LONG_BREAK, DEFAULT_BREAK_INTERVAL);
window.timer = timer;

document.querySelector('.settings-modal-form').addEventListener('submit', handleSettingsSubmit);

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
