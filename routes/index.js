const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const records = require('./modules/records')
const user = require('./modules/user')

const { authenticator } = require('../middleware/auth')

router.use('/user', user)
router.use('/', authenticator, home)
router.use('/records', authenticator, records)


module.exports = router
