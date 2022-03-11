const compareAnswers = require('../public/scripts/util/utils').compareAnswers
const saveResult = require('../public/scripts/util/utils').saveResult
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('tests/index', { user: req.user })
})

router
    .route('/one')
    .get((req, res) => {
        res.render('tests/one', { user: req.user })
    })
    //TODO: Pass user as parameter to fill what's been answered
    .post((req, res) => {
        res.redirect('/tests/one')
    })

router.get('/two', (req, res) => {
    res.render('tests/two', { user: req.user })
})

router.get('/three', (req, res) => {
    res.render('tests/three', { user: req.user })
})


router
    .route('/one/:exercise')
    .post(async (req, res) => {
        const tUnit = 'one'
        const answers = req.body
        
        const result = {
            id: req.user.id,
            unit: tUnit,
            exercise: req.params.exercise,
            grade: await compareAnswers({ unit: tUnit, exercise: req.params.exercise, answers: answers })
        }
        console.log(result)
        await saveResult(result)

        res.redirect('/tests/one')
    })

module.exports = router