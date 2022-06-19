// Exercise switching
const url = String(window.location.pathname);

var exam, submitExamBtn, exerciseContainer, exerciseBtns;

if (
  (url == "/exams/one") |
  (url == "/exams/two") |
  (url == "/exams/three") |
  (url == "/exams/final") |
  (url == "/exams/one/results") |
  (url == "/exams/two/results") |
  (url == "/exams/three/results") |
  (url == "/exams/final/results")
) {
  exam = url.substring(1, url.length).replace("/", "-").replace("s", "");

  submitExamBtn = document.getElementById("submit-exam-btn");
  exerciseContainer =
    document.getElementsByClassName("exam-container")["0"].children; //document.getElementById(exam);

  if (exerciseContainer) {
    hideAllExercises();
    exerciseContainer[0].style.display = "grid";
    if (submitExamBtn) {
      submitExamBtn.style.display = "none";
    }
  }

  exerciseBtns = document.getElementsByClassName("ex-btn");
  if (exerciseBtns) {
    let i = 0;
    exerciseBtns[0].classList.add("active");
    for (const btn of exerciseBtns) {
      btn.addEventListener("click", displayExercise);
      btn.toDisplay = i++;
    }
  }
}

function displayExercise(evt) {
  hideAllExercises();

  console.log(evt.currentTarget.toDisplay);
  exerciseContainer[evt.currentTarget.toDisplay].style.display = "grid";

  for (const btn of exerciseBtns) {
    btn.classList.remove("active");
  }

  evt.currentTarget.classList.add("active");

  if (evt.currentTarget.toDisplay == 3) {
    if (submitExamBtn) {
      submitExamBtn.style.display = "block";
    }
  } else {
    if (submitExamBtn) {
      submitExamBtn.style.display = "none";
    }
  }
}

function hideAllExercises() {
  for (const exercise of exerciseContainer) {
    exercise.style.display = "none";
  }
}
