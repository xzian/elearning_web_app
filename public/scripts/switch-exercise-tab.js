// Exercise switching
var url = window.location.pathname;

const submitExamBtn = document.getElementById("submit-exam-btn");

const exam = url.substring(1, url.length).replace("/", "-").replace("s", "");
const exerciseContainer = document.getElementById(exam);

const ex1Btn = document.getElementById("ex1-btn");
const ex2Btn = document.getElementById("ex2-btn");
const ex3Btn = document.getElementById("ex3-btn");
const ex4Btn = document.getElementById("ex4-btn");

if (exerciseContainer) {
  hideAllExercises();
  exerciseContainer.children[0].style.display = "block";
  submitExamBtn.style.display = "none";
}

if (ex1Btn) {
  ex1Btn.addEventListener("click", displayExercise);
  ex1Btn.toDisplay = 0;
}

if (ex2Btn) {
  ex2Btn.addEventListener("click", displayExercise);
  ex2Btn.toDisplay = 1;
}

if (ex3Btn) {
  ex3Btn.addEventListener("click", displayExercise);
  ex3Btn.toDisplay = 2;
}

if (ex4Btn) {
  ex4Btn.addEventListener("click", displayExercise);
  ex4Btn.toDisplay = 3;
}

function displayExercise(evt) {
  hideAllExercises();
  exerciseContainer.children[evt.currentTarget.toDisplay].style.display =
    "block";
  if (evt.currentTarget.toDisplay == 3) {
    submitExamBtn.style.display = "block";
  } else {
    submitExamBtn.style.display = "none";
  }
}

function hideAllExercises() {
  for (const exercise of exerciseContainer.children) {
    exercise.style.display = "none";
  }
}
