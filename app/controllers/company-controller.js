const Company = require('../db/models/company')

class CompanyController {
	async showCompanies(req, res) {
		const companies = await Company.find({})

		res.render('pages/companies/companies', {
			companies,
		})
	}

	async showCompany(req, res) {
		const { name } = req.params

		const company = await Company.findOne({ slug: name })

		res.render('pages/companies/company', {
			name: company?.name,
			title: company?.name ?? 'Brak wyników',
		})
	}

	showCreateCompany(req, res) {
		res.render('pages/companies/create')
	}

	async createCompany(req, res) {
		console.log(req.body)
		const company = new Company({
			name: req.body.name,
			slug: req.body.slug,
			employeesCount: req.body.employeesCount,
		})
		try {
			await company.save()
			res.redirect('/firmy')
		} catch (e) {
			res.render('pages/companies/create', {
				errors: e.errors,
				form: req.body,
			})
		}
	}

	async showEditCompanyForm(req, res) {
		const { name } = req.params
		const company = await Company.findOne({ slug: name })

		res.render('pages/companies/edit', { form: company })
	}

	async editCompany(req, res) {
		const { name } = req.params
		const company = await Company.findOne({ slug: name })

		company.name = req.body.name
		company.slug = req.body.slug
		company.employeesCount = req.body.employeesCount

		try {
			await company.save()
			res.redirect('/firmy')
		} catch (e) {
			res.render('pages/companies/edit', {
				errors: e.errors,
				form: req.body,
			})
		}
	}

	async deleteCompany(req, res) {
		const { name } = req.params

		try {
			await Company.deleteOne({ slug: name })
			res.redirect('/firmy')
		} catch (e) {
			//
		}
	}
}

module.exports = new CompanyController()
