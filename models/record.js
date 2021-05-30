const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Category = require('./category')

const recordSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', index: true, require: true },
  name: { type: String, require: true },
  category: {
    _id: { type: Schema.Types.ObjectId, ref: 'Category', require: true },
    name: { type: String, require: true },
    image: { type: String, require: true }
  },
  date: { type: String, require: true },
  merchant: { type: String, require: true },
  amount: { type: String, require: true },
})

module.exports = mongoose.model('Record', recordSchema)
