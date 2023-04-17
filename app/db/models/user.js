const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { validateEmail } = require('../validators')

const userSchema = new Schema({
	email: {
		type: String,
		required: [true, 'email jest wymagany '],
		lowercase: true,
		trim: true,
		unique: true,
		validate: [validateEmail, 'email nieprawidlowy'],
	},
	password: {
		type: String,
		required: true,
		minLength: [4, 'haslo powinno zawierac min 4 znaki'],
	},
})

userSchema.post('save', function (error, doc, next) {
	//post uruchamia sie kiedy dokument zostal zapisany
	if (error.code === 11000) {
		error.errors = { email: { message: 'Taki email jeest zajety' } }
	}
	next(error)
})

const User = mongoose.model('User', userSchema)

module.exports = User
