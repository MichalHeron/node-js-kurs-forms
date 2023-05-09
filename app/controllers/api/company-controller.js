const Company = require('../../db/models/company')

class CompanyController {
	async showCompanies(req, res) {
		// res.header('Content-Type', 'application/json') // w naglowku 'header' ustawiamy(mowimy) jakiego typu dokument bedziemy przesylac
		// res.send(JSON.stringify({ text: 'value' })) // nie mozna wyslac poprostu "{ text: 'value' }" - jest to javascriptowy json a nalezy przerobic go na json-owy string
		// res.json({ text: 'value' }) // linijki powyej to to samo co res.json

		const companies = await Company.find()
		res.json(companies) //res.status(200).json() - mozna dodac dowolny status
	}
	//postman ustawiony na Content-type na format json application/json wyslany raw - wymagany odpowiedni parser w app
	async create(req, res) {
		//to samo co podczas tworzenia firmy, zamienion a odpoweidz na status201
		const company = new Company({
			name: req.body.name,
			slug: req.body.slug,
			employeesCount: req.body.employeesCount,
			// user: req.session.user._id, //tymczasowo zakomentowana lnijka logowania ktora bedzie dodana zas
			user: req.body.user,
		})
		try {
			await company.save()
			res.status(201).json(company)
		} catch (e) {
			res.status(422).json({ errors: e.errors })
		}
	}
}

module.exports = new CompanyController()
