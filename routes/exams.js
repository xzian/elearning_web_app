const compareAnswers = require('../config/utils').compareAnswers
const saveResult = require('../config/utils').saveResult
const express = require('express')
const router = express.Router()

var cachedAnswers = {}

router.get('/', (req, res) => {
    res.render('exams/index', { user: req.user })
})

router
    .route('/one')
    .get((req, res) => {
        res.render('exams/one', { user: req.user, chosen: cachedAnswers })
    })
    .post((req, res) => {
        res.redirect('/exams/one')
    })

router.get('/two', (req, res) => {
    res.render('exams/two', { user: req.user })
})

router.get('/three', (req, res) => {
    res.render('exams/three', { user: req.user })
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

        res.redirect('/exams/one')
    })

module.exports = router