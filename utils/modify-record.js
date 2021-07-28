const Category = require("../models/category")
const Record = require("../models/record")

const modifyRecord = async (theRecord, status, id, userId) => {
  const category = await Category.findOne({ name: theRecord.category }).lean()
  theRecord.date = theRecord.date.split("-").join("/")
  theRecord.categoryId = category._id
  switch (status) {
    case "create":
      theRecord.userId = userId
      await Record.create(theRecord)
      break
    case "update":
      await Record.findByIdAndUpdate(id, theRecord)
      break
  }
}

module.exports = modifyRecord
