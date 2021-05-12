const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Category = require('./category')

const recordSchema = new Schema({
  name: String,
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  date: Date,
  amount: String,
})

module.exports = mongoose.model('Record', recordSchema)
