const u1exercises = Array.from(document.getElementsByClassName("u1exercises"))
const u2exercises = Array.from(document.getElementsByClassName("u2exercises"))
const u3exercises = Array.from(document.getElementsByClassName("u3exercises"))

const prevExercise = document.getElementById("prev-exercise-btn")
const nextExercise = document.getElementById("next-exercise-btn")

var active1 = 0
if (u1exercises) {
    u1exercises.forEach(element => {
        element.hidden = true
    });
    u1exercises[active1].hidden = false
}

if (nextExercise && prevExercise) {
    nextExercise.addEventListener("click", () => {
        u1exercises[active1].hidden = true
        u1exercises[active1 + 1 >= u1exercises.length ? u1exercises.length - 1 : ++active1].hidden = false
    })
    prevExercise.addEventListener("click", () => {
        u1exercises[active1].hidden = true
        u1exercises[active1 < 1 ? 0 : --active1].hidden = false
    })
}

var active2 = 0
if (u2exercises) {
    u2exercises.forEach(element => {
        element.hidden = true
    });
    u2exercises[active2].hidden = false
}

if (nextExercise && prevExercise) {
    nextExercise.addEventListener("click", () => {
        u2exercises[active2].hidden = true
        u2exercises[active2 + 1 >= u2exercises.length ? u2exercises.length - 1 : ++active2].hidden = false
    })
    prevExercise.addEventListener("click", () => {
        u2exercises[active2].hidden = true
        u2exercises[active2 < 1 ? 0 : --active2].hidden = false
    })
}

var active3 = 0
if (u3exercises) {
    u3exercises.forEach(element => {
        element.hidden = true
    });
    u3exercises[active3].hidden = false
}

if (nextExercise && prevExercise) {
    nextExercise.addEventListener("click", () => {
        u3exercises[active3].hidden = true
        u3exercises[active3 + 1 >= u3exercises.length ? u3exercises.length - 1 : ++active3].hidden = false
    })
    prevExercise.addEventListener("click", () => {
        u3exercises[active3].hidden = true
        u3exercises[active3 < 1 ? 0 : --active3].hidden = false
    })
}