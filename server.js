// Development stuff
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

// Express server setup
const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const app = express()

const bodyParser = require('body-parser')

// Route files
const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const studyingMaterialRouter = require('./routes/studying_material')
const testsRouter = require('./routes/tests')
const statisticsRouter = require('./routes/statistics')

// Database setup
const mongoose = require('mongoose')
const db = mongoose.connection
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true})
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

// Views setup
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true}))

// Route links
app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/studying_material', studyingMaterialRouter)
app.use('/tests', testsRouter)
app.use('/statistics', statisticsRouter)

app.listen(process.env.PORT || 3000)