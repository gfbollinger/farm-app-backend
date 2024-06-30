const mongoose = require('mongoose')

const cropSchema = new mongoose.Schema({
  name: { type: String, required: true },
  scientificName: { type: String },
  name_en: { type: String },
  type: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  season: { type: String, required: true },
  planting_date: { type: [String], required: true, enum: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"] },
  harvest_date: { type: Date },
  growth_duration: { type: Number },
  soil_type: { type: String },
  watering_frequency: { type: String },
  sunlight: { type: String },
  fertilizer: { type: String },
  notes: String,
  inStock: { type: Boolean },
  pests: [String],
  diseases: [String]
})

const Crop = mongoose.model('Crop', cropSchema)

module.exports = Crop