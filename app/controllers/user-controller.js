const { render } = require('ejs')

class UserController {
	showRegister(req, res) {
		res.render('pages/auth/register')
	}

	async Register(req, res) {
		try {
			// await UserController.save()
			res.render('/zaloguj')
		} catch (e) {
			res.render('pages/auth/register', {
				errors: e.errors,
				form: req.body,
			})
		}
	}
}

module.exports = new UserController()
