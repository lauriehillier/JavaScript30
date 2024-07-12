let countdown;
const displayTimer = document.querySelector(".display__time-left");
const displayEnd = document.querySelector(".display__end-time");
const timerButtons = document.querySelectorAll("[data-time]");
//const input = document.querySelector("customform");

function timer(seconds) {
  clearInterval(countdown);
  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);
  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const mins = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const secs = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  const display = mins + ":" + secs;
  displayTimer.textContent = display;
  document.title = display;
}
function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours().toString().padStart(2, "0");
  const minutes = end.getMinutes().toString().padStart(2, "0");
  const seconds = end.getSeconds().toString().padStart(2, "0");
  displayEnd.textContent = `Back at ${hour}:${minutes}:${seconds}`;
}

function startTimer(e) {
  timer(e.target.dataset.time);
}

timerButtons.forEach((button) => {
  button.addEventListener("click", startTimer);
});

document.customForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const mins = this.customForm.minutes.value;
  timer(mins * 60);
  this.customForm.reset();
});
