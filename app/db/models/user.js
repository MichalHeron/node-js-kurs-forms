const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt') //biblitoeka do hashowania hasel
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
	firstName: String,
	lastName: String,
})

// userSchema.path('password').set(value => {  // nie do konca wlasciwy sposob hashowania poniewaz hashuje rpzed sprawdzaniem ilosci znakow
// 	const salt = bcrypt.genSaltSync(10) //liczba oznacza ile mocy obliczeniowej ma uzyc - im wiecej tym lepie
// 	const hash = bcrypt.hashSync(value, salt)
// 	return hash
// })

userSchema.pre('save', function (next) {
	const user = this
	if (!user.isModified('password')) return next()
	const salt = bcrypt.genSaltSync(10) //liczba oznacza ile mocy obliczeniowej ma uzyc - im wiecej tym lepie
	const hash = bcrypt.hashSync(user.password, salt)
	user.password = hash
	next()
})

userSchema.post('save', function (error, doc, next) {
	//post uruchamia sie kiedy dokument zostal zapisany
	if (error.code === 11000) {
		error.errors = { email: { message: 'Taki email jeest zajety' } }
	}
	next(error)
})

userSchema.methods = {
	//miejsce gdzie beda dostepne metody m.in do weryfikacji hasla
	comparePassword(password) {
		return bcrypt.compareSync(password, this.password)
	},
}

userSchema.virtual('fullName').get(function () {
	//virtualne pola wykorzystane w opisei CEO
	return `${this.firstName} ${this.lastName[0]}.` //[0] tylko pierwszy znak
})

const User = mongoose.model('User', userSchema)

module.exports = User
