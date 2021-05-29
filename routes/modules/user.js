const express = require('express')
const router = express.Router()
const User = require('../../models/user')

router.get('/', (req, res) => {
  res.render('user')
})

router.post('/login', (req, res) => {
  const { email, password } = req.body
  User.findOne({ email })
    .then(find => {
      if (!find) { return res.redirect('/user') }

      if (password !== find.password) {
        return res.redirect('/user')
      }

      return res.redirect('/')
    })
    .catch(err => console.log(err))
})

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