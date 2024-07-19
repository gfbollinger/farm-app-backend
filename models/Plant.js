const mongoose = require('mongoose')

const plantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  imageUrl: String,
  scientificName: { type: String },
  name_en: { type: String },
  type: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  subcategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  season: { type: String },
  planting_date: { type: [String], enum: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"] },
  harvest_date: { type: Date },
  growth_duration: { type: Number },
  soil_type: { type: String },
  watering_frequency: { type: String },
  sunlight: { type: String },
  fertilizer: { type: String },
  notes: String,
  inStock: { type: Boolean },
  pests: [String],
  diseases: [String],
  rating: { type: Number, min: 0, max: 10 },
  origin: String,
})

const Plant = mongoose.model('Plant', plantSchema)

module.exports = Plant