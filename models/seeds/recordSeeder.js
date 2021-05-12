const mongoose = require('mongoose')

const Record = require('../record')
const Category = require('../category')
const records = require('../sampleData/records')


mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('running recordSeeder...')

  records.forEach(each => {
    Category.findOne({ name: each.category })
      .lean()
      .then(obj =>
        Record.create({
          name: each.name,
          category: obj._id,
          date: each.date,
          amount: each.amount,
        })
      )
  })

  console.log('closing in 3 secs...')

  setTimeout(() => {
    return db.close()
  }, 3000);
})
