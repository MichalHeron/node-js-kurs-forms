const mongoose = require('mongoose')
const url = ''

mongoose.connect(url, {
    useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true,
}) //polaczenie z bd oraz po / z mode-kurs - dodaje sie parametry z dokumntacji jest mniej bledow w kursie jest - w rzeczywostosci tego juz nie ma





// const Company = require('./models/company')

// async function main() {
// 	// const companies = await Company.find({})  //pobieranie
// 	// console.log(companies)

// 	const company = new Company({
// 		name: 'Probox',
// 		slug: 'probox', //slug - przetestowac custom validation
// 		// employeesCount: 0,
// 	})

// 	try {
// 		await company.save()
// 	} catch (e) {
// 		console.log('cos poszlo nie tak')
// 		for (const key in e.errors) {
// 			console.log(e.errors[key].message)
// 		}
// 	}
// }
// main()

// // Company.find({}, (err, docs) => {
// // 	console.log(docs)
// // })
