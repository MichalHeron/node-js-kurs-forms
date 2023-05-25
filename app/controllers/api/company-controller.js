const Company = require('../../db/models/company')
const fs = require('fs')

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
			user: req.user._id,
		})
		try {
			await company.save()
			res.status(201).json(company)
		} catch (e) {
			res.status(422).json({ errors: e.errors })
		}
	}

	//postman ustawiony na form-data poniewaz musi byc wysylanie jako formularz i by potem  przejsc przez express.urlencoded
	async edit(req, res) {
		const { slug } = req.params
		const company = await Company.findOne({ slug: slug })

		if (req.body.name) company.name = req.body.name
		if (req.body.slug) company.slug = req.body.slug
		if (req.body.employeesCount) company.employeesCount = req.body.employeesCount

		if (req.file.filename && company.image) {
			fs.unlinkSync('public/uploads/' + company.image)
		}
		if (req.file.filename) {
			company.image = req.file.filename
		}

		try {
			await company.save()
			res.status(200).json(company)
		} catch (e) {
			res.status(422).json({ errors: e.errors })
		}
	}

	async delete(req, res) {
		const { slug } = req.params
		const company = await Company.findOne({ slug }) // dodane przeze mnie
		try {
			if (company.image) {
				fs.unlinkSync('public/uploads/' + company.image)
			}
			await Company.deleteOne({ slug })
			res.sendStatus(204) //tylko status 200 przyjumje dane do zwrotu. ten zapis to samo co status(204).send()
		} catch (e) {
			//
		}
	}
}

module.exports = new CompanyController()
