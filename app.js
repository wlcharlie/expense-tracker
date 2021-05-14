const express = require('express')
const exphbs = require('express-handlebars')
const hbsHelpers = require('handlebars-helpers')
const methodOverride = require('method-override')
const mongoose = require('mongoose')

const Record = require('./models/record')
const Category = require('./models/category')
const categoryFilter = require('./models/category-filter')
const modifyRecord = require('./models/modify-record')

const app = express()
const helpers = hbsHelpers()
const port = 3000

mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('handlebars', exphbs({ helpers, defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
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


app.get('/records/new', (req, res) => {
  Category.find({})
    .lean()
    .then(category => res.render('new', { category }))
})

app.post('/records', (req, res) => {
  modifyRecord(req.body, 'create')
  setTimeout(() => {
    res.redirect('/')
  }, 0000);
})

app.get('/records/:id/edit', (req, res) => {
  Record.findById(req.params.id)
    .lean()
    .then(record => {
      record.date = record.date.split('/').join('-')
      Category.find({}).lean().then(category => res.render('edit', { record, category }))
      // res.render('edit', { record })
    })
    .catch(err => console.error(err))
})

app.put('/records/:id', (req, res) => {
  modifyRecord(req.body, 'update', req.params.id)
  setTimeout(() => {
    res.redirect('/')
  }, 0000);
})

app.delete('/records/:id', (req, res) => {
  Record.findByIdAndDelete(req.params.id)
    .then(() => res.redirect(req.get('referer')))
    .catch(err => console.error(err))
})

app.listen(port, () => {
  console.log(`app is listening on http://localhost:${port}`)
})
