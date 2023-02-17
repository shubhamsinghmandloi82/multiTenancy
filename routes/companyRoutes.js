const express = require('express')
const router = express.Router();
const controller = require('../controllers/index')

router.post('/createCompany',controller.companyController.createCompany)
router.post('/createEmployee',controller.companyController.createEmployee)


module.exports = router ;