require('dotenv').config()
const Category = require('../category')
const categories = require('../sampleData/categories')
const db = require('../../config/mongoose')


db.once('open', () => {
  console.log('ON! running categorySeeder...')

  Category.create(categories)
    .then(() => {
      console.log('DONE! Closing connection...')
      return db.close()
    })
})
