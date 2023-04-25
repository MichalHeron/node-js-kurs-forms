const Company = require('../db/models/company')
const fs = require('fs') // wbudowana bilblioteka node-a  fs potafi miedzy innymi usuwac pliki

class CompanyController {
	async showCompanies(req, res) {
		const { q, sort, countmin, countmax } = req.query

		const page = req.query.page || 1
		const perPage = 2 //zmienne do paginacji

		// const companies = await Company.find({ name: { $regex: q || '', $options: 'i' } }) //dodano wyrazenie regularne z opcja 'i' ktora nie zwraca uwagi na wielkosc liter
		// let query = Company.find({ name: { $regex: q || '', $options: 'i' }, employeesCount: { $gte: countmin || 0  } }) //gte - greater than or equal comparision expression

		const where = {}

		//search
		if (q) where.name = { $regex: q, $options: 'i' }

		//filtring
		if (countmin || countmax) {
			where.employeesCount = {}
			if (countmin) where.employeesCount.$gte = countmin
			if (countmax) where.employeesCount.$lte = countmax
		}
		console.log(where)
		let query = Company.find(where)

		//pagination
		query = query.skip((page - 1) * perPage) //okreslamy ile na strone ma pominac
		query = query.limit(perPage)

		console.log(query)
		//sorting
		if (sort) {
			const s = sort.split('|')
			query = query.sort({ [s[0]]: s[1] })
			// query = query.sort({ [sort]: 'asc ' })
		}

		//exec
		const companies = await query.populate('user').exec() //populate - zeby przy pobieraniu wypelnilo pole user
		const resultsCount = await Company.find(where).count()
		const pagesCount = Math.ceil(resultsCount / perPage)

		res.render('pages/companies/companies', {
			companies,
			page,
			pagesCount,
			resultsCount,
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
			user: req.session.user._id,
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
		if (req.file.filename && company.image) {
			fs.unlinkSync('public/uploads/' + company.image)
		}
		if (req.file.filename) {
			company.image = req.file.filename
		}
		// console.log(req.file) //moze byc files jezeli wiele plikow albo nawet i cale tablice

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
		const company = await Company.findOne({ slug: name }) // dodane przeze mnie
		try {
			if (company.image) {
				fs.unlinkSync('public/uploads/' + company.image)
			}
			await Company.deleteOne({ slug: name })
			res.redirect('/firmy')
		} catch (e) {
			//
		}
	}

	async deleteImage(req, res) {
		const { name } = req.params
		const company = await Company.findOne({ slug: name })
		try {
			fs.unlinkSync('public/uploads/' + company.image)
			company.image = ''
			await company.save()
			res.redirect('/firmy')
		} catch (e) {
			//
		}
	}
}

module.exports = new CompanyController()
