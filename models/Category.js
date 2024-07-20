const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: String,
  subcategories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  plantType: [{
    _id: { type: mongoose.Schema.Types.ObjectId, ref: 'PlantType' },
    name: String,
  }]
})

const Category = mongoose.model('Category', categorySchema)

module.exports = Category