const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')
const categoryFilter = require('../../models/category-filter')

router.get('/', (req, res) => {
  const categoryChoosen = req.query.category || ''

  Record.find(categoryFilter(categoryChoosen))
    .sort({ date: 'desc' })
    .lean()
    .then(record => {
      const total = []
      record.forEach(data => total.push(Number(data.amount)))
      Category.find({})
        .lean()
        .then(category => res.render('index', { record, category, categoryChoosen, total }))
    })
    .catch(err => console.error(err))
})

module.exports = router
