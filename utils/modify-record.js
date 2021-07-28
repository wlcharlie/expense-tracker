const Category = require("../models/category")
const Record = require("../models/record")

const modifyRecord = async (theRecord, status, id, userId) => {
  console.log(theRecord)
  theRecord.date = theRecord.date.split("-").join("/")
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
