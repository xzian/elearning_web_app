const express = require('express')
const router = express.Router()

// Password hashing
const bcrypt = require('bcrypt')
const genPassword = require('../lib/passwordUtils').genPassword

// Passport authentication
const passport = require('passport')
require('../config/passport')

// Database access (User collection)
const mongoose = require('mongoose')
const connection = require('../config/database')
const User = require('../models/user')

// Get the login route and access to the input data
router.get('/login', async (req, res) => {
    res.render('users/login', { user: new User() })
})

// Get the registration route and 
// access to the input data
router.get('/register', (req, res) => {
    res.render('users/register', { user: new User() })
})

// Look for user in the database 
// when the login form has been submitted
// checkAuthenticated doesn't work until 
// 'passport' is implemented
//router.post('/login', /*checkAuthenticated,*/ async (req, res) => {
//    const user = await User.findOne({email : req.body.email})
//    if (user == null) {
//        return res.status(400).send('Cannot find user')
//    }
//    try {
//        if (await bcrypt.compare(req.body.password, user.password)) {
//            res.redirect('/')
//        } else {
//            res.send('Not Allowed')
//        }
//    } catch {
//        res.status(500).send()
//    }
//})
router.post('/login', passport.authenticate('local', {
    successRedirect: '/users/login-success',
    failureRedirect: '/users/login-failure'
}))

// Create new user and add them to 
// the database when the registration 
// form has been submitted
router.post('/register', async (req, res) => {
    let hashedPassword = null

    if (req.body.password) {
        hashedPassword = await genPassword(req.body.password)//await bcrypt.hash(req.body.password, 10)
    }

    const user = new User({
        username: req.body.username,
        email: req.body.email, 
        password: hashedPassword 
    })
    
    try {
        const newUser = await user.save()
        res.redirect('/users/login')
    } catch (e) {
        res.render('users/register', {
            user: user,
            errorMessage: `Error creating account: ${e}`
        })
    }   
})

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    } else {
        return response.redirect('/login')
    }
}

module.exports = router