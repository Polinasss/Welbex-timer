const hoursElement = document.getElementById("hours");
const minElement = document.getElementById("min");
const secElement = document.getElementById("sec");
const form = document.forms["my-form"];
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");
const submitBtn = document.getElementById("submit");
const arrayOfInputs = [...form.getElementsByTagName("input")];

let isPaused = false;
let userHours, userMinutes, userSeconds, timer = undefined;

function submitSettings(e) {
  e.preventDefault();
  const data = {
    worktimeHours: Number(this.worktimeHours.value),
    worktimeMin: Number(this.worktimeMin.value),
    worktimeSec: Number(this.worktimeSec.value),
  };
  hoursElement.innerHTML = data.worktimeHours;
  minElement.innerHTML = data.worktimeMin;
  secElement.innerHTML = data.worktimeSec;
}

const counter = () => {
  secElement.innerHTML = secElement.innerHTML - 1;
  if (secElement.innerHTML < 0) {
    secElement.innerHTML = 59;
    minElement.innerHTML = minElement.innerHTML - 1;
    if (minElement.innerHTML < 0) {
      minElement.innerHTML = 59;
      hoursElement.innerHTML = hoursElement.innerHTML - 1;
    }
  }
};

function start() {
  userHours = hoursElement.innerHTML;
  userMinutes = minElement.innerHTML;
  userSeconds = secElement.innerHTML;

  if (userHours == 0 && userMinutes == 0 && userSeconds == 0) {
    alert("Таймер не может быть 0:0:0. Введите хоть какое нибудь время");
  } else {
    startBtn.setAttribute("disabled", "");
    submitBtn.setAttribute("disabled", "");
    arrayOfInputs.forEach((el) => el.setAttribute("disabled", ""));
    pauseBtn.removeAttribute("disabled");
    resetBtn.removeAttribute("disabled");

    timer = setInterval(() => {
      if (!isPaused) {
        counter();
        if (hoursElement.innerHTML == 0 && minElement.innerHTML == 0 && secElement.innerHTML == 0) {
          reset(userHours, userMinutes, userSeconds);
        }
      }
    }, 1000);
  }
}

function pause() {
  isPaused = !isPaused;
  !isPaused ? (pauseBtn.innerHTML = "Пауза") : (pauseBtn.innerHTML = "Возобновить");
}

function reset(h, m, s) {
  clearInterval(timer, console.log("Stop"));
  isPaused = false;
  pauseBtn.innerHTML = "Пауза";
  pauseBtn.setAttribute("disabled", "");
  resetBtn.setAttribute("disabled", "");
  startBtn.removeAttribute("disabled");
  submitBtn.removeAttribute("disabled");
  arrayOfInputs.forEach((el) => el.removeAttribute("disabled"));

  hoursElement.innerHTML = h;
  minElement.innerHTML = m;
  secElement.innerHTML = s;
}

startBtn.addEventListener("click", start);
pauseBtn.addEventListener("click", pause);
resetBtn.addEventListener("click", () => reset(userHours, userMinutes, userSeconds));
form.addEventListener("submit", submitSettings);