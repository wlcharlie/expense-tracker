require('dotenv').config()
const Record = require('../record')
const Category = require('../category')
const records = require('../sampleData/records')
const db = require('../../config/mongoose')

const sampleUser = require('../sampleData/users')
const User = require('../user')
const bcrypt = require('bcryptjs')

db.once('open', () => {
  console.log('running recordSeeder...')

  Promise.all(Array.from(sampleUser, each =>
    bcrypt.genSalt(10)
      .then(salt => bcrypt.hash(each.password, salt))
      .then(hash => User.create({
        name: each.name,
        email: each.email,
        password: hash
      }))
      .catch(err => console.error(err))
  ))


  Promise.all(Array.from(records, each => {
    Category.findOne({ name: each.category })
      .lean()
      .then(obj => {
        User.findOne({ name: each.user })
          .lean()
          .then(user => {
            Record.create({
              userId: user._id,
              name: each.name,
              category: obj,
              date: each.date,
              merchant: each.merchant,
              amount: each.amount
            })
          })
          .catch(err => console.error(err))
      })
  }))

  console.log('closing in 3 secs...')

  setTimeout(() => {
    return db.close()
  }, 5000);
})
