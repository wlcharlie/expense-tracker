const express = require('express')
const exphbs = require('express-handlebars')
const hbsHelpers = require('handlebars-helpers')
const methodOverride = require('method-override')
const mongoose = require('mongoose')

const Record = require('./models/record')
const categoryFilter = require('./models/category-filter')
const modifyRecord = require('./models/modify-record')

const app = express()
const helpers = hbsHelpers()
const port = 3000

mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })

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
  const category = req.query.category || ''

  Record.find(categoryFilter(category))
    .sort({ date: 'desc' })
    .lean()
    .then(record => res.render('index', { record, category }))
    .catch(err => console.error(err))
})


app.get('/records/new', (req, res) => {
  res.render('new')
})

app.post('/records', (req, res) => {
  let newRecord = req.body
  modifyRecord(newRecord)
  setTimeout(() => {
    res.redirect('/')
  }, 0000);
})

app.delete('/records/:id', (req, res) => {
  Record.findByIdAndDelete(req.params.id)
    .then(() => res.redirect(req.get('referer'))) //(分類頁面)哪裡刪除回到哪裡
})

app.listen(port, () => {
  console.log(`app is listening on http://localhost:${port}`)
})
