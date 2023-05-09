//nowy plik routingowy dla utrzymania porzadku (od webowej dzie sa elementy wyswietlane, dla uzytkownika, sa elemntami nterfejsu - endponitu api uzytkownik nie bedzie widzial)

const express = require('express')
const router = new express.Router()
const CompanyController = require('../controllers/api/company-controller')

router.get('/companies', CompanyController.showCompanies)
router.post('/companies', CompanyController.create)

module.exports = router


// GET pobieranie danych
// POST dodawanie
// PUT edycja
// DELETE usuwanie
