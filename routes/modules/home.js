const express = require("express")
const router = express.Router()

const Record = require("../../models/record")
const Category = require("../../models/category")
const Filter = require("../../utils/filter")

router.get("/", async (req, res) => {
  const search = req.query.search || ""
  const time = req.query.time || ""
  const [year, month] = time.split("-")
  const categoryId = req.query.category || ""
  const userId = req.user._id

  try {
    const category = await Category.find().lean()
    let record = await Record.find(Filter(categoryId, userId))
      .sort({ date: "desc" })
      .populate("categoryId")
      .lean()

    if (time) {
      record = record.filter(
        each => each.date.includes(year) && each.date.includes(month)
      )
    }
    if (search) {
      record = record.filter(each => each.name.includes(search))
    }

    const totalAmount = record.map(each => each.amount)
    const categoryChoosen =
      categoryId && category.filter(e => e._id.equals(categoryId))[0].name

    return res.render("index", {
      record,
      search,
      time,
      totalAmount,
      category,
      categoryId,
      categoryChoosen,
    })
  } catch (error) {
    throw new Error(error)
  }
})

module.exports = router
