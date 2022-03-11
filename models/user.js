const connection = require('../config/database')
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },    
    units: [{
        unitName: {
            type: String,
            required: true
        },
        exercise: {
            type: String,
            required: true
        },
        grade: {
            type: Number,
            required: true
        }
    }]
})

module.exports = mongoose.model('User', userSchema, 'users')