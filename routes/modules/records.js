const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')
const modifyRecord = require('../../models/modify-record')

router.get('/new', (req, res) => {
  Category.find({})
    .lean()
    .then(category => res.render('new', { category }))
})

router.post('/', (req, res) => {
  modifyRecord(req.body, 'create')
  setTimeout(() => {
    res.redirect('/')
  }, 0000);
})

router.get('/:id/edit', (req, res) => {
  Record.findById(req.params.id)
    .lean()
    .then(record => {
      record.date = record.date.split('/').join('-')
      Category.find({}).lean().then(category => res.render('edit', { record, category }))
    })
    .catch(err => console.error(err))
})

router.put('/:id', (req, res) => {
  modifyRecord(req.body, 'update', req.params.id)
  setTimeout(() => {
    res.redirect('/')
  }, 0000);
})

router.delete('/:id', (req, res) => {
  Record.findByIdAndDelete(req.params.id)
    .then(() => res.redirect(req.get('referer')))
    .catch(err => console.error(err))
})

module.exports = router
