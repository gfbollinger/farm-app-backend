const express = require('express')
const router = express.Router()
const Plant = require('../models/Plant')
const { route } = require('./categories')
const Category = require('../models/Category')

// Get all plants
router.get('/', async(req, res) => {
  try {
    const plants = await Plant.find().populate('category')
    res.json(plants)
  } catch (err) {
    res.status(500).json({message: err.message})
  }
})

// Filter plants
router.get('/filter', async(req, res) => {
  const {category, season} = req.query
  try {
    const query = {}
    if (category) {
      const categoryDoc = await Category.findOne({ name: category })
      if (categoryDoc) {
        query.category = categoryDoc._id
      } else {
        return res.status(404).json({ message: 'Category not found'})
      }
    }
    if (season) query.season = season
    const plants = await Plant.find(query).populate('category')
    res.json(plants)
  } catch (err) {
    res.status(500).json({message: err.message})
  }
})

// Get a single plant
router.get('/:id', async(req, res) => {
  try {
    const plant = await Plant.findById(req.params.id).populate('category')
    if (plant === null) {
      return res.status(404).json({ message: 'Cannot find plant' })
    }
    res.json(plant)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Add Plant
router.post('/', async(req, res) => {
  const {name, description, imageUrl, scientificName, name_en, type, category, season,
    planting_date, harvest_date, growth_duration, soil_type,
    watering_frequency, sunlight, fertilizer, notes, inStock,
    pests, diseases, rating, origin } = req.body

  const plant = new Plant({
    name,
    description,
    imageUrl,
    scientificName,
    name_en,
    type,
    category,
    season,
    planting_date,
    harvest_date,
    growth_duration,
    soil_type,
    watering_frequency,
    sunlight,
    fertilizer,
    notes,
    inStock,
    pests,
    diseases,
    rating,
    origin,
  })

  try {
    const newPlant = await plant.save()
    res.status(201).json(newPlant)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Update a plant
router.patch('/:id', async (req, res) => {
  const {name, description, imageUrl, scientificName, name_en, type, category, season,
    planting_date, harvest_date, growth_duration, soil_type,
    watering_frequency, sunlight, fertilizer, notes, inStock,
    pests, diseases, rating, origin} = req.body

  try{
    // Find the category if we have the name
    /* let categoryDoc
    if (category) {
      categoryDoc = await Category.findOne({ name: 'category' })
      if(!categoryDoc){
        return res.status(404).json({ message: `Coudn't find the category`})
      }
    } */
    const updatedPlant = await Plant.findByIdAndUpdate( req.params.id, {
      name,
      description,
      imageUrl,
      scientificName,
      name_en,
      type,
      //category: categoryDoc ? categoryDoc._id : undefined,
      category: category,
      season,
      planting_date,
      harvest_date,
      growth_duration,
      soil_type,
      watering_frequency,
      sunlight,
      fertilizer,
      notes,
      inStock,
      pests,
      diseases,
      rating,
      origin
    },
    { new: true,  runValidators: true }
  )

  if(!updatedPlant){
    return res.status(404).json({ message: 'Plant not found' })
  }

  res.json(updatedPlant)

  } catch (err){
    res.status(500).json({ message: err.message})
  }
})

// Delete plant
router.delete('/:id', async (req, res) => {
  try {
    const result = await Plant.deleteOne({ _id: req.params.id })

    if (result.deletedCount === 0){
      return res.status(404).json({ message: 'Cannot find plant' });
    }
    res.json({ message: 'Plant deleted'})
  } catch {
    res.status(500).json({ message: err. message })
  }
})

module.exports = router