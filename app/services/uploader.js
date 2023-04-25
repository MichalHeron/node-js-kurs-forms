const path = require('path') //biblioteka wgrana w node
const multer = require('multer')
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		//destination ma funkcje ktory callback przekazuje error (null) i parametr string z destynacja pliku
		cb(null, 'public/uploads/')
	},
	filename: function (req, file, cb) {
		const name = Date.now() + path.extname(file.originalname) //extname rozszerzenie orignianlen nazwy datenow dla unikalnej nazwy
		cb(null, name) //przekazuje nazwe pliku
	},
})
const upload = multer({ storage })
// const upload = multer({ dest: 'public/uploads' })

module.exports = upload
