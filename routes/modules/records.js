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

router.get("/:id/edit", async (req, res) => {
  const record = await Record.findById(req.params.id)
    .populate("categoryId")
    .lean()
  const category = await Category.find({}).lean()
  console.log(record)
  record.date = record.date.split("/").join("-")
  return res.render("edit", { record, category })
})

router.put("/:id", async (req, res) => {
  await modifyRecord(req.body, "update", req.params.id, null)
  return res.redirect("/")
})

router.delete("/:id", async (req, res) => {
  await Record.findByIdAndDelete(req.params.id)
  return res.redirect(req.get("referer"))
})

module.exports = router
