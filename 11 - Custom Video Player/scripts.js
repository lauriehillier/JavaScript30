// Get elements
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const ranges = player.querySelectorAll(".player__slider");
const skipButtons = player.querySelectorAll("[data-skip");
// Functions
function togglePlay() {
  video.paused ? video.play() : video.pause();
}
function updateButton() {
  toggle.textContent = this.paused ? "►" : "⏸";
}
function skip() {
  video.currentTime += +this.dataset.skip;
}
function handleRangeUpdate() {
  video[this.name] = +this.value;
}
function handleProgress() {
  const updateTime = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${updateTime}%`;
}
function scrub(e) {
  console.log(this);
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// Event listeners
toggle.addEventListener("click", togglePlay);

video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", handleProgress);

skipButtons.forEach((skipButton) => skipButton.addEventListener("click", skip));

ranges.forEach((range) => range.addEventListener("input", handleRangeUpdate));

progress.addEventListener("click", scrub);
let mousedown = false;
// progress.addEventListener("mousemove", scrub);
// progress.addEventListener("mousedown", () => (mouseDown = true));
// progress.addEventListener("mouseup", () => (mouseDown = false));
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));
