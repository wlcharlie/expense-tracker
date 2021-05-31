const express = require('express')
const router = express.Router()
const passport = require('passport')
const User = require('../../models/user')
const bcrypt = require('bcryptjs')

router.get('/', (req, res) => {
  console.log(req)
  res.render('user')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/user',
  failureFlash: true
}))

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  if (password !== confirmPassword) {
    req.flash('errorRegMsg', '密碼與確認密碼不同')
    return res.render('user', {
      name,
      email,
    })
  }

  bcrypt.genSalt(10)
    .then(salt => bcrypt.hash('password', salt))
    .then(hash => User.create({
      name,
      email,
      password: hash
    }))
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})



router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/user')
})

module.exports = router