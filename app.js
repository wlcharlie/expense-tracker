const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const hbsHelpers = require('handlebars-helpers')
const methodOverride = require('method-override')
const flash = require('connect-flash')
const { authenticator } = require('./middleware/auth')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const usePassport = require('./config/passport')
const routes = require('./routes')
require('./config/mongoose')

const app = express()
const helpers = hbsHelpers()
const port = process.env.PORT

app.engine('handlebars', exphbs({ helpers, defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}))
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

usePassport(app)
app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.successMsg = req.flash('successMsg')
  res.locals.warningMsg = req.flash('warningMsg')
  res.locals.errorRegMsg = req.flash('errorRegMsg')
  res.locals.error = req.flash('error')
  next()
})

app.use(routes)

app.listen(port, () => {
  console.log(`app is listening on http://localhost:${port}`)
})
