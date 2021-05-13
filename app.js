const express = require('express')
const exphbs = require('express-handlebars')
const hbsHelpers = require('handlebars-helpers')
const mongoose = require('mongoose')
const Record = require('./models/record')

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
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  const category = req.query.category || ''
  let filter = {}

  if (category) {
    filter = { 'category.name': category }
  } else {
    filter = {}
  }

  Record.find(filter)
    .lean()
    .then(record => res.render('index', { record, category }))
    .catch(err => console.error(err))
})



app.listen(port, () => {
  console.log(`app is listening on http://localhost:${port}`)
})