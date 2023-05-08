const Company = require('../../db/models/company')

class CompanyController {
	async showCompanies(req, res) {
		// res.header('Content-Type', 'application/json') // w naglowku 'header' ustawiamy(mowimy) jakiego typu dokument bedziemy przesylac
		// res.send(JSON.stringify({ text: 'value' })) // nie mozna wyslac poprostu "{ text: 'value' }" - jest to javascriptowy json a nalezy przerobic go na json-owy string
		// res.json({ text: 'value' }) // linijki powyej to to samo co res.json

		const companies = await Company.find()
		res.json(companies)
	}
}

module.exports = new CompanyController()
