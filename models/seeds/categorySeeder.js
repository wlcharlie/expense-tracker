const mongoose = require('mongoose')

const Category = require('../category')
const categories = require('../sampleData/categories')


mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('ON! running categorySeeder...')

  Category.create(categories)
    .then(() => {
      console.log('DONE! Closing connection...')
      return db.close()
    })
})
