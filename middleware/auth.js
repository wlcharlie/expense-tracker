module.exports = {
  authenticator: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    req.flash('warningMsg', '請先登入 | 新註冊用戶請嘗試登入')
    res.redirect('/user')
  }
}