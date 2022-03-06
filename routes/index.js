const express = require('express')
const router = express.Router()
const User = require('../models/user')

// Render index.ejs
router.get('/', (req, res) => {
    res.render('index', { user: new User() })
})

module.exports = router