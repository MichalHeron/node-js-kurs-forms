const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { checkForbidenString } = require('../validators')

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
// companySchema.path('slug').set(value => value.toLowerCase())

module.exports = Company
