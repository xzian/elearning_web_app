const mongoose = require('mongoose')
const Answer = require('../../../models/answer')

async function compareAnswers(test) {
    const document = await Answer.findOne({ unit: test.unit, exercise: test.exercise })
    if (document.solutions !== undefined) {
        let score = 0
        let index = 0
        for (const key in test.answers) {
            if (document.solutions[index] === test.answers[key]) {
                score += 2
            }
            index++
        }

        return score
    }
    return 0
}

module.exports = compareAnswers