const express = require('express')
const router = express.Router()
const passport = require('passport')

// 轉到FB跟使用者確認授權的項目
router.get('/facebook', passport.authenticate('facebook', {
  scope: ['email', 'public_profile']
}));

router.get('/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/login'
}))


module.exports = router