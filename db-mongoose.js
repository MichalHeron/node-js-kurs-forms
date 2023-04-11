const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.connect('', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true,
}) //polaczenie z bd oraz po / z mode-kurs - dodaje sie parametry z dokumntacji jest mniej bledow w kursie jest - w rzeczywostosci tego juz nie ma

const checkForbidenString = (value, forbidenString) => {
	if (value === forbidenString) {
		throw new Error(`Nazwa ${forbidenString} jest zakazana`)
	}
}

// tworzy sie model
const companySchema = new Schema({
	slug: {
		type: String,
		required: [true, 'Pole slug jest wymagane'],
		minLength: [3, 'minimalna liczba znakow to 3'], //minimalna liczba znakow
		validate: checkForbidenString(value, 'slug'),
		trim: true,
		// lowercase: true, // to samo co setter
	},
	name: {
		type: String,
		required: [true, 'Pole name jest wymagane'],
	},
	employeesCount: {
		type: Number,
		min: 1,
		default: 1,
	},
})
const Company = mongoose.model('Company', companySchema) //definiowanie modelu a mongoose domysla sie nazwy kolekcji na podstawie modelu

//setter
companySchema.path('slug').set(value => value.toLowerCase())

async function main() {
	// const companies = await Company.find({})  //pobieranie
	// console.log(companies)

	const company = new Company({
		name: 'Probox',
		slug: 'probox', //slug - przetestowac custom validation
		// employeesCount: 0,
	})

	try {
		await company.save()
	} catch (e) {
		console.log('cos poszlo nie tak')
		for (const key in e.errors) {
			console.log(e.errors[key].message)
		}
	}
}
main()

// Company.find({}, (err, docs) => {
// 	console.log(docs)
// })
