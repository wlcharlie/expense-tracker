const Record = require('../record')
const Category = require('../category')
const records = require('../sampleData/records')
const db = require('../../config/mongoose')

db.once('open', () => {
  console.log('running recordSeeder...')

  records.forEach(each => {
    Category.findOne({ name: each.category })
      .lean()
      .then(obj =>
        Record.create({
          name: each.name,
          category: obj,
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
