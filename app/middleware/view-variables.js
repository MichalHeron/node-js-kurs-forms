module.exports = function (req, res, next) {
	res.locals.url = req.url
	res.locals.errors = null //dodanie zmienie w middleware spowoduje uproszczenie warunkow w widokach tzn bedziemy sprawdzac czy dany errorr w ogole jest zamiast za kazdym razem czy jest undefinied
	res.locals.form = {}
	next()
}
