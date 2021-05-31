const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')
const categoryFilter = require('../../models/category-filter')

router.get('/', (req, res) => {
  const time = req.query.time || ''
  const [year, month] = time.split('-')

  const categoryChoosen = req.query.category || ''
  const userId = req.user._id
  Record.find(categoryFilter(categoryChoosen, userId))
    .sort({ date: 'desc' })
    .lean()
    .then(record => {
      if (time) {
        record = record.filter(each => {
          if (each.date.includes(year) && each.date.includes(month)) {
            return each
          }
        })
      }
      const totalAmount = []
      record.forEach(data => totalAmount.push(Number(data.amount)))
      Category.find({})
        .lean()
        .then(category => res.render('index', {
          record,
          category,
          categoryChoosen,
          totalAmount,
          time
        }))
    })
    .catch(err => console.error(err))
})

module.exports = router
