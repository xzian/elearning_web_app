const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const User = require('../models/user')

// User login route (get page)
router.get('/login', async (req, res) => {
    res.render('users/login', { user: new User() })
})

// New user route (get page)
router.get('/register', (req, res) => {
    res.render('users/register', { user: new User() })
})

// User login route
router.post('/', async (req, res) => {
    const user = await User.findOne({email : req.body.email})
    if (user == null) {
        return res.status(400).send('Cannot find user')
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            res.send('Success')
        } else {
            res.send('Not Allowed')
        }
    } catch {
        res.status(500).send()
    }
})

// Register new user
router.post('/', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = new User({ 
            email: req.body.email, 
            password: hashedPassword 
        })
        user.save((err, newUser) => {
            if (err) {
                res.render('users/register', {
                    email: email,
                    errorMessage: 'Error creating account'
                })
            } else {
                //res.status(201).redirect('users').send('success')
                res.redirect('/')
            }
        })
    } catch {
        res.status(500).send()
    }
})


module.exports = router