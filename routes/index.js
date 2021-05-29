const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const records = require('./modules/records')
const user = require('./modules/user')

router.use('/', home)
router.use('/records', records)
router.use('/user', user)

module.exports = router
