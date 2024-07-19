const mongoose = require('mongoose')

const plantTypeSchema = new mongoose.Schema({
  name: String,
  category: { type: mongoose.Types.ObjectId, ref: 'category' },
})

const PlantType = mongoose.model('PlantType', plantTypeSchema)

module.exports = PlantType