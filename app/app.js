const express = require('express')
const path = require('path')
const ejsLayouts = require('express-ejs-layouts')
const app = express()
const cookieParser = require('cookie-parser')
const session = require('express-session')
const { sessionKeySecret } = require('./config')

// init database
require('./db/mongoose')

//session (middleware)
app.use(
	session({
		secret: sessionKeySecret,
		saveUninitialized: true, //jezeli bedzie false to sesja moze zniknac po na przyklad odswiezeniu
		cookie: { maxAge: 1000 * 60 * 60 * 24 * 2 }, // 2day
		resave: false, // razem z saveuninitiliaed slzua do zpaisywaniq sesji na serwer - opisy cioezkie po prostu jest true i false
	})
)

// view engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname + '/../views'))
// set layout
app.use(ejsLayouts)
app.set('layout', 'layouts/main')
// public folder
app.use(express.static('public'))

app.use(express.urlencoded({ extended: true }))
// formularze wysylane sa za pomoca: application/x-www-form-urlencoded     bodyParser przerobi i zapisze w zmiennej body
app.use(cookieParser())

// middleware
app.use('/', require('./middleware/view-variables-middleware'))
app.use('/', require('./middleware/user-middleware'))
app.use('/admin', require('./middleware/is-auth-middleware'))

// mount routes
app.use(require('./routes/web'))

module.exports = app
