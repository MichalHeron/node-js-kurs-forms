const User = require('../../db/models/user')

class UserController {
	async login(req, res) {
		try {
			const user = await User.findOne({ email: req.body.email })
			if (!user) throw new Error('user not found')

			const isValidPassword = user.comparePassword(req.body.password)
			if (!isValidPassword) throw new Error('password not valid')

			//wyslane w postmanie raw email oraz password i header Content-Type apllication/json

			res.status(200).json({ apiToken: user.apiToken }) // otrzymujemy zwrotna informacje o naszym tokenie ktory potem w auth wykorzysujemy do autoryzacji baerer token
		} catch (e) {
			res.sendStatus(403) //lub 401 unauthorized
		}
	}
}

module.exports = new UserController()
