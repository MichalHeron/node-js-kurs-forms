const User = require('../db/models/user')

module.exports = async function (req, res, next) {
	//Bearer "token" metoda autoryzacji przez postman w headers nazwa Authorization lub w zaklatce authorization
	const token = req.headers.authorization?.split(' ')[1]
	if (!token) {
		res.status(403).json({ message: 'dostep zabroniony' })
	}
	const user = await User.findOne({ apiToken: token })
	console.log(user)
	if (!user) {
		res.sendStatus(403) //res.status(403).json({message:"dostep zabroniony"})
	}

	req.user = user //jesli warunek nie bedzie spelniony  przypisz usera do zmiennej req.user ktora mona pozniej wykorzystac na przyklad w controllere company

	next()
}
