const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('statistics/index')
})

module.exports = router