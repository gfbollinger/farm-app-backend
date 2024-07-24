const mongoose = require('mongoose')

const plantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  imageUrl: String,
  imageUrlLocal: String,
  isImageUrlOption: { type: String, enum: ['local', 'cloud'], default: 'local' },
  scientificName: { type: String },
  name_en: { type: String },
  plantType: { type: mongoose.Schema.Types.ObjectId, ref: 'PlantType', required: true },
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
  
  /* Specific Tomato fields */
  /* cultivation_use: { 
    type: [String], 
    enum: ["salsa", "ensalada"], 
    required: function() { return this.category && this.category.name === 'Tomate'; }
  },
  shape: { 
    type: String, 
    enum: ["redondo", "ovalado", "pera", "corazon", "ciruela", "beefsteak"], 
    required: function() { return this.category && this.category.name === 'Tomate'; }
  },
  growth_type: { 
    type: String, 
    enum: ["determinado", "indeterminado"], 
    required: function() { return this.category && this.category.name === 'Tomate'; }
  },
  color: { 
    type: String, 
    enum: ["rojo", "amarillo", "naranja", "verde", "púrpura", "negro", "rayado"], 
    required: function() { return this.category && this.category.name === 'Tomate'; }
  },
  fruit_size: { 
    type: String, 
    enum: ["pequeño", "mediano", "grande", "gigante"], 
    required: function() { return this.category && this.category.name === 'Tomato'; }
  } */
})

const Plant = mongoose.model('Plant', plantSchema)

module.exports = Plant