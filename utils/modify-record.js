const Category = require("../models/category")
const Record = require("../models/record")

const modifyRecord = async (theRecord, status, id, userId) => {
  theRecord.date = theRecord.date.split("-").join("/")

  Category.findOne({ name: theRecord.category })
    .lean()
    .then((obj) => {
      theRecord.category = obj
      switch (status) {
        case "create":
          theRecord.userId = userId
          Record.create(theRecord).catch((err) => console.error(err))
          break
        case "update":
          Record.findByIdAndUpdate(id, theRecord).catch((err) =>
            console.error(err)
          )
          break
      }
    })
}

module.exports = modifyRecord
