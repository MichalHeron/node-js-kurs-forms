const express = require('express')
const path = require('path')
const ejsLayouts = require('express-ejs-layouts')
const app = express()

//init  database
require('./db/mongoose')

app.set('view engine', 'ejs')
app.set(path.join(__dirname + '/views'))

app.use(ejsLayouts)
app.set('layout', './layouts/main')

// public folder
app.use(express.static('public'))

// routers mounting
app.use(require('./routes/web.js'))

module.exports = app
