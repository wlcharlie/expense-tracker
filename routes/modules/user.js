const express = require("express")
const router = express.Router()
const passport = require("passport")
const User = require("../../models/user")
const bcrypt = require("bcryptjs")

router.get("/", (req, res) => {
  return res.render("user")
})

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/user",
    failureFlash: true,
  })
)

router.post("/register", async (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  if (password !== confirmPassword) {
    req.flash("errorRegMsg", "密碼與確認密碼不同")
    return res.render("user", {
      name,
      email,
    })
  }

  const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  await User.create({ name, email, password: hash })
  return res.redirect("/")
})

router.get("/logout", (req, res) => {
  req.logout()
  res.redirect("/user")
})

module.exports = router
