// Development stuff
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

// Express server setup
const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const session = require('express-session')
const app = express()

// Post request processing
const bodyParser = require('body-parser')

// Route files
const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const studyingMaterialRouter = require('./routes/studying_material')
const testsRouter = require('./routes/tests')

// Session setup
const MongoStore = require('connect-mongo')//.default
const sessionStore = MongoStore.create({
    mongoUrl: process.env.DATABASE_URL,
    collection: 'sessions'
})

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    }
}))

// Passport setup
const passport = require('passport')
require('./config/passport')
app.use(passport.initialize())
app.use(passport.session())

// Logging out
const methodOverride = require('method-override')
app.use(methodOverride('_method'))

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

app.listen(process.env.PORT || 3000)