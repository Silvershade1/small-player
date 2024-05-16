// select element

const videoElem = document.querySelector("video");
const containerElem = document.querySelector(".container");
const progressAreaElem = document.querySelector(".progress-area");
const progressElem = document.querySelector(".progress");
const playBtn = document.getElementById("play");
const fullScerenBtn = document.getElementById("full-sceren");
const volume = document.getElementById("volume");
const timeall = document.getElementById("time-all");
const timeleft = document.getElementById("time-left");
const volumeIcon = document.getElementById("iconVolume");
const backwardBtn = document.getElementById("backward");
const forewardBtn = document.getElementById("foreward");
const importBtn = document.getElementById("import");
const fileinput = document.getElementById("fileInput");
const popupContainer = document.querySelector(".popup-container");
let isPlay = false;

importBtn.addEventListener("click", () => {
  const file = fileinput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const content = e.target.result;
      videoElem.src = content;
    };
    reader.readAsDataURL(file);
    popupContainer.style.display = "none"
  } else {
    alert("input a file");
  }

});

playBtn.addEventListener("click", () => {
  isPlay = !isPlay;

  if (isPlay) {
    playBtn.classList.replace("fa-play", "fa-pause");
    videoElem.play();
  } else {
    playBtn.classList.replace("fa-pause", "fa-play");
    videoElem.pause();
  }
});
fullScerenBtn.addEventListener("click", () => {
  containerElem.classList.toggle("fullsceren");
});

volume.addEventListener("change", () => {
  videoElem.volume = volume.value / 10;
  if (volume.value == 0) {
    volumeIcon.classList.replace("fa-volume-high", "fa-volume-mute");
  } else {
    volumeIcon.classList.replace("fa-volume-mute", "fa-volume-high");
  }
});

function updateTimeDisplay() {
  const currentTime = videoElem.currentTime;

  const minutes = Math.floor(currentTime / 60);
  const seconds = Math.floor(currentTime % 60);

  const formattedTime = `${minutes}:${seconds.toString().padStart(2, "0")}`;
  return formattedTime;
}

const player = document.getElementById("myVideo");

videoElem.addEventListener("timeupdate", function () {
  const currentTime = videoElem.currentTime;
  const duration = videoElem.duration;
  const elapsedTime = (currentTime / duration) * 100;

  progressElem.style.width = `${elapsedTime.toFixed(2)}%`;
  timeleft.textContent = updateTimeDisplay();
  videoTime();
});

progressAreaElem.addEventListener("click", (e) => {
  let timelineWidth = progressAreaElem.clientWidth;
  videoElem.currentTime = (e.offsetX / timelineWidth) * videoElem.duration;
});

function videoTime() {
  const durationTime = videoElem.duration;
  const minutes = Math.floor(durationTime / 60);
  const seconds = Math.floor(durationTime % 60);

  const formattedTime = `${minutes}:${seconds.toString().padStart(2, "0")}`;
  timeall.textContent = formattedTime;
}

backwardBtn.addEventListener("click", () => {
  videoElem.currentTime = videoElem.currentTime - 5;
});
forewardBtn.addEventListener("click", () => {
  videoElem.currentTime = videoElem.currentTime + 5;
});
