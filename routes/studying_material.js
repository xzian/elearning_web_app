const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('studying_material/index')
})

module.exports = router