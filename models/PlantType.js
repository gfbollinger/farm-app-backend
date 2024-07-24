const mongoose = require('mongoose')

const plantTypeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: String,
})

const PlantType = mongoose.model('PlantType', plantTypeSchema)

module.exports = PlantType