const mongoose = require('mongoose')
const Answer = require('../models/answer')
const User = require('../models/user')

async function compareAnswers(test) {
    const answers = await Answer.findOne({ unit: test.unit, exercise: test.exercise })
    if (answers.solutions !== undefined) {
        let score = 0
        let index = 0
        for (const key in test.answers) {
            if (answers.solutions[index] === test.answers[key]) {
                score++
            }
            index++
        }
        return (test.exercise === '4') ? score : score * 2
    }
    return 0
}

async function saveResult(results) {
    const toAdd = {
        unitName: results.unit,
        exercise: results.exercise,
        grade: results.grade
    }

    if (await User.find({ _id: results.id, units: { exercise: results.exercise } })) {
        await User.updateOne({ _id: results.id }, { $pull: { units: { exercise: results.exercise } } })
    }
    
    await User.updateOne({ _id: results.id }, { $push: { units: toAdd } })
}

module.exports.compareAnswers = compareAnswers
module.exports.saveResult = saveResult