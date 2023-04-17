const User = require('../db/models/user')

class UserController {
	showRegister(req, res) {
		res.render('pages/auth/register')
	}

	async register(req, res) {
		const user = new User({
			email: req.body.email,
			password: req.body.password,
		})
		try {
			await user.save()
			res.render('/zaloguj')
		} catch (e) {
			// if (e.code === 11000){
			//     e.errors = {email: {message: 'Taki email jeest zajety'}} //jedna z metod wyrzucenia bledu z db o zajetym mailu. ale zeby nie powtarzac kodu zostalo przeniesione
			res.render('pages/auth/register', {
				errors: e.errors,
				form: req.body,
			})
		}
	}
}

module.exports = new UserController()
