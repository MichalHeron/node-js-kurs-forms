class CompanyController {
	showCompany = (req, res) => {
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
	}
}

module.exports = new CompanyController()
