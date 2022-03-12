var active_exam = "exam-one"

const examOneButton = document.getElementById("exam-one-btn")
if (examOneButton) {
    examOneButton.show = document.getElementById("exam-one")
    examOneButton.hide = [document.getElementById("exam-two"), document.getElementById("exam-three")]
    examOneButton.addEventListener("click", (e) => {
        e.currentTarget.show.hidden = false
        e.currentTarget.hide.forEach(element => {
            element.hidden = true
        });
        active_exam = "exam-one"
    })
}

const examTwoButton = document.getElementById("exam-two-btn")
if (examTwoButton) {
    examTwoButton.show = document.getElementById("exam-two")
    examTwoButton.hide = [document.getElementById("exam-one"), document.getElementById("exam-three")]
    examTwoButton.addEventListener("click", (e) => {
        e.currentTarget.show.hidden = false
        e.currentTarget.hide.forEach(element => {
            element.hidden = true
        });
        active_exam = "exam-two"
    })
}

const examThreeButton = document.getElementById("exam-three-btn")
if (examThreeButton) {
    examThreeButton.show = document.getElementById("exam-three")
    examThreeButton.hide = [document.getElementById("exam-one"), document.getElementById("exam-two")]
    examThreeButton.addEventListener("click", (e) => {
        e.currentTarget.show.hidden = false
        e.currentTarget.hide.forEach(element => {
            element.hidden = true
        });
        active_exam = "exam-three"
    })
}

if (window.location.pathname === "/exams") {
    document.getElementById("exam-two").hidden = true
    document.getElementById("exam-three").hidden = true
}