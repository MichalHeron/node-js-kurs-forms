class PageController {
	showHome(req, res) {
		// res.sendFile(path.join(__dirname + '/views/home.html'))
		res.render('pages/home', {
			title: 'Strona główna',
			url: req.url,
		})
	}

	showNotFound(req, res) {
		res.render('errors/404', {
			title: 'nie znaleziono',
			layout: 'layouts/minimalistic',
			url: req.url,
		})
	}
}

module.exports = new PageController()
