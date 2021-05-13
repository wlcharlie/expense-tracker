const Category = require('./category')
const Record = require('./record')

function modifyRecord(theRecord) {

  theRecord.date = theRecord.date.split('-').join('/')

  Category.findOne({ name: theRecord.category })
    .lean()
    .then(obj => {
      theRecord.category = obj
      Record.create(theRecord)
    })
}

module.exports = modifyRecord