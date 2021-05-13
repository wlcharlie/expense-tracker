const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Category = require('./category')

const recordSchema = new Schema({
  name: String,
  category: {
    _id: { type: Schema.Types.ObjectId, ref: 'Category' },
    name: String,
    image: String
  },
  date: String,
  amount: String,
})

module.exports = mongoose.model('Record', recordSchema)
