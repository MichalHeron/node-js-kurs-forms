const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { checkForbidenString } = require('../validators');

// model
const companySchema = new Schema({
  slug: {
    type: String,
    required: [true, 'Pole slug jest wymagane'],
    minLength: [3, 'Minimalna liczba znaków to 3'],
    validate: value => checkForbidenString(value, 'slug'),
    trim: true,
    lowercase: true,
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
  user: {
    type: mongoose.Types.ObjectId, //zmienna moongose okreslajca zmienna id w bazie danych
    required: true,
    ref: 'User', //model 'User' jest referencją
  }
});
// setter
// companySchema.path('slug').set((value) => value.toLowerCase());

const Company = mongoose.model('Company', companySchema);

module.exports = Company;