const compareAnswers = require('../public/scripts/util/utils')
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
        const answers = req.body

        const results = await compareAnswers({ unit: "one", exercise: req.params.exercise, answers: answers })
        console.log(results)

        res.redirect('/tests/one')
    })

module.exports = router