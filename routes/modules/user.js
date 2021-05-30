const express = require('express')
const router = express.Router()
const passport = require('passport')
const User = require('../../models/user')

router.get('/', (req, res) => {
  res.render('user')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users'
}))

router.post('/register', (req, res) => {
  const { name, email, password } = req.body
  User.create({
    name,
    email,
    password
  })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

module.exports = router