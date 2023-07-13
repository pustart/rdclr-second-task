import { DEFAULT_BREAK_INTERVAL, DEFAULT_POMODORO, DEFAULT_LONG_BREAK, DEFAULT_SHORT_BREAK } from "./constants.js";
import Timer from "./timer.js";

const timer = new Timer(DEFAULT_POMODORO, DEFAULT_SHORT_BREAK, DEFAULT_LONG_BREAK, DEFAULT_BREAK_INTERVAL);
window.timer = timer;
