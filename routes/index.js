const express = require('express')
const router = express.Router();

router.use('/company',require('./companyRoutes'))

module.exports = router ;