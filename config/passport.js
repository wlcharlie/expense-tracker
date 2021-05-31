const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy

const User = require('../models/user')

module.exports = app => {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(new LocalStrategy({ usernameField: 'email', passReqToCallback: true },
    (req, email, password, done) => {
      User.findOne({ email })
        .then(user => {
          if (!user) {
            return done(null, false, { message: '找不到使用者。註冊了嗎?' })
          }
          if (user.password !== password) {
            return done(null, false, { message: '電子信箱或密碼輸入錯誤。' })
          }

          return done(null, user)
        })
        .catch(err => done(err, false))
    }
  ))

  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/callback",
    profileFields: ['displayName', 'email']
  }, (accessToken, refreshToken, profile, done) => {
    const { name, email } = profile._json
    User.findOne({ email })
      .then(user => {
        if (user) return done(null, user)

        User.create({
          name,
          email
        })
          .then(user => done(null, user))
          .catch(err => done(err, false))
      })
  }))

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })
}