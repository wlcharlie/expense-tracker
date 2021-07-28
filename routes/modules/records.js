const express = require("express")
const router = express.Router()

const Record = require("../../models/record")
const Category = require("../../models/category")
const modifyRecord = require("../../utils/modify-record")

router.get("/new", async (req, res) => {
  const category = await Category.find({}).lean()
  return res.render("new", { category })
})

router.post("/", async (req, res) => {
  await modifyRecord(req.body, "create", null, req.user._id)
  return res.redirect("/")
})

router.get("/:id/edit", (req, res) => {
  Record.findById(req.params.id)
    .lean()
    .then((record) => {
      record.date = record.date.split("/").join("-")
      Category.find({})
        .lean()
        .then((category) => res.render("edit", { record, category }))
    })
    .catch((err) => console.error(err))
})

router.put("/:id", async (req, res) => {
  await modifyRecord(req.body, "update", req.params.id, null)
  return res.redirect("/")
})

router.delete("/:id", (req, res) => {
  Record.findByIdAndDelete(req.params.id)
    .then(() => res.redirect(req.get("referer")))
    .catch((err) => console.error(err))
})

module.exports = router
