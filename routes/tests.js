const compareAnswers = require('../public/scripts/util/utils').compareAnswers
const saveResult = require('../public/scripts/util/utils').saveResult
const express = require('express')
const router = express.Router()

var cachedAnswers = {}

router.get('/', (req, res) => {
    res.render('tests/index', { user: req.user })
})

router
    .route('/one')
    .get((req, res) => {
        res.render('tests/one', { user: req.user, chosen: cachedAnswers })
    })
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
        cachedAnswers = req.body
        console.log(cachedAnswers)
        
        const result = {
            id: req.user.id,
            unit: tUnit,
            exercise: req.params.exercise,
            grade: await compareAnswers({ unit: tUnit, exercise: req.params.exercise, answers: cachedAnswers })
        }
        console.log(result)
        await saveResult(result)

        res.redirect('/tests/one')
    })

module.exports = router