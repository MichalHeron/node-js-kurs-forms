const express = require('express')
const port = 3000
const path = require('path')
const ejsLayouts = require('express-ejs-layouts')
const app = express()

app.set('view engine', 'ejs')
app.set(path.join(__dirname + '/views'))

app.use(ejsLayouts)
app.set('layout', './layouts/main')
// public folder
app.use(express.static('public'))

app.get('/', (req, res) => {
	// res.sendFile(path.join(__dirname + '/views/home.html'))
	res.render('pages/home', {
		title: 'Strona główna',
		url: req.url,
	})
})

app.get('/firmy/:name', (req, res) => {
	console.log(req.params)
	const { name } = req.params //const name = req.params.name
	const companies = [
		{ slug: 'tworcastron', name: 'Tworca Stron' },
		{ slug: 'brukmode', name: 'Bruk Mode' },
	]

	const company = companies.find(x => x.slug === name)

	res.render('pages/company', {
		name: company?.name,
		companies: companies,
		title: company?.name ?? 'brak wynikow',
		url: req.url,
	})
})

app.get('*', (req, res) => {
	res.render('errors/404', {
		title: 'nie znaleziono',
		layout: 'layouts/minimalistic',
		url: req.url,
	})
})

app.listen(port)
