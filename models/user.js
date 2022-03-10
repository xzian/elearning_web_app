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
        grade: {
            type: Number,
            required: false
        },
        exercises: [{
            exerciseName: {
                type: String,
                required: true
            },
            answers: {
                type: Array,
                required: true
            }
        }]
    }]
})

module.exports = mongoose.model('User', userSchema, 'users')