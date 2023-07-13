import { TimerState } from "./constants.js";

export default class Timer {
  constructor(pomodoro, shortBreak, longBreak, breakInterval) {
    this._pomodoro = pomodoro * 60;
    this._shortBreak = shortBreak * 60;
    this._longBreak = longBreak * 60;
    this._breakInterval = breakInterval;
    this._timerInterval = null;
    this._currentTime = this._pomodoro;
    this._pomodorosCompleted = 0;
    this._isTimerRunning = false;
    this._currentBreakType = TimerState.POMODORO;
  }

  get pomodoro() {
    return this._pomodoro;
  }

  set pomodoro(value) {
    this._pomodoro = value * 60;
  }

  get shortBreak() {
    return this._shortBreak;
  }

  set shortBreak(value) {
    this._shortBreak = value * 60;
  }

  get longBreak() {
    return this._longBreak;
  }

  set longBreak(value) {
    this._longBreak = value * 60;
  }

  get breakInterval() {
    return this._breakInterval;
  }

  set breakInterval(value) {
    this._breakInterval = value;
  }

  startTimer() {
    if (!this._isTimerRunning) {
      this._timerInterval = setInterval(() => this.#updateTimer(), 1000);
      this._isTimerRunning = true;
    }
  }

  pauseTimer() {
    clearInterval(this._timerInterval);
    this._isTimerRunning = false;
  }

  resetTimer() {
    this.pauseTimer();
    this._currentBreakType = TimerState.POMODORO;
    this._currentTime = this._pomodoro;
    this._pomodorosCompleted = 0;
    this.#updateTimerDisplay();
    this.#updateTimerInfo();
  }

  switchToShortBreak() {
    this._isTimerRunning = false;
    this.pauseTimer();
    this._currentBreakType = TimerState.SHORT_BREAK;
    this._currentTime = this._shortBreak;
    this.#updateTimerDisplay();
    this.#updateTimerInfo();
  }

  switchToLongBreak() {
    this._isTimerRunning = false;
    this.pauseTimer();
    this._currentBreakType = TimerState.LONG_BREAK;
    this._currentTime = this._longBreak;
    this.#updateTimerDisplay();
    this.#updateTimerInfo();
  }

  #updateTimerInfo() {
    const timerInfoSpan = document.querySelector(".timer-name");
    let timerInfoText = "";
    switch (this._currentBreakType) {
      case TimerState.POMODORO:
        timerInfoText = TimerState.POMODORO;
        break;
      case TimerState.SHORT_BREAK:
        timerInfoText = TimerState.SHORT_BREAK;
        break;
      case TimerState.LONG_BREAK:
        timerInfoText = TimerState.LONG_BREAK;
        break;
      default:
        break;
    }
    timerInfoSpan.textContent = timerInfoText;
  }

  #updateTimer() {
    if (this._currentTime > 0) {
      this._currentTime--;
      this.#updateTimerDisplay();
    } else {
      clearInterval(this._timerInterval);
      this._isTimerRunning = false;
      this._pomodorosCompleted++;

      if (this._pomodorosCompleted % this._breakInterval === 0) {
        this._currentTime = this._longBreak;
      } else {
        this._currentTime = this._shortBreak;
      }

      this.#updateTimerDisplay();
    }
  }

  #updateTimerDisplay() {
    const minutes = Math.floor(this._currentTime / 60);
    const seconds = this._currentTime % 60;
    const timeDisplay = `${this.#padTime(minutes)}:${this.#padTime(seconds)}`;
    document.querySelector('.time').textContent = timeDisplay;
  }

  #padTime(time) {
    return String(time).padStart(2, '0');
  }
}
