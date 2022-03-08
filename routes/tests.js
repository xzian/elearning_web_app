const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('tests/index', { user: req.user })
})

router.get('/one', (req, res) => {
    res.render('tests/one')
})

router.get('/two', (req, res) => {
    res.render('tests/two')
})

router.get('/three', (req, res) => {
    res.render('tests/three')
})

module.exports = router