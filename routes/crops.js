const express = require('express')
const router = express.Router()
const Crop = require('./../models/Crop')
const { route } = require('./categories')
const Category = require('../models/Category')

// Get all crops
router.get('/', async(req, res) => {
  try {
    const crops = await Crop.find().populate('category')
    res.json(crops)
  } catch (err) {
    res.status(500).json({message: err.message})
  }
})

// Filter crops
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
    const crops = await Crop.find(query).populate('category')
    res.json(crops)
  } catch (err) {
    res.status(500).json({message: err.message})
  }
})

// Get a single crop
router.get('/:id', async(req, res) => {
  try {
    const crop = await Crop.findById(req.params.id).populate('category')
    if (crop === null) {
      return res.status(404).json({ message: 'Cannot find crop' })
    }
    res.json(crop)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Add Crop
router.post('/', async(req, res) => {
  const {name, scientificName, name_en, type, category, season,
    planting_date, harvest_date, growth_duration, soil_type,
    watering_frequency, sunlight, fertilizer, notes, inStock,
    pests, diseases} = req.body

  const crop = new Crop({
    name,
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
    diseases
  })

  try {
    const newCrop = await crop.save()
    res.status(201).json(newCrop)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Update a crop
router.patch('/:id', async (req, res) => {
  const {name, scientificName, name_en, type, category, season,
    planting_date, harvest_date, growth_duration, soil_type,
    watering_frequency, sunlight, fertilizer, notes, inStock,
    pests, diseases} = req.body

  try{
    // Find the category if we have the name
    /* let categoryDoc
    if (category) {
      categoryDoc = await Category.findOne({ name: 'category' })
      if(!categoryDoc){
        return res.status(404).json({ message: `Coudn't find the category`})
      }
    } */
    const updatedCrop = await Crop.findByIdAndUpdate( req.params.id, {
      name,
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
        diseases
    },
    { new: true,  runValidators: true }
  )

  if(!updatedCrop){
    return res.status(404).json({ message: 'Crop not found' })
  }

  res.json(updatedCrop)

  } catch (err){
    res.status(500).json({ message: err.message})
  }
})

// Delete crop
router.delete('/:id', async (req, res) => {
  try {
    const result = await Crop.deleteOne({ _id: req.params.id })

    if (result.deletedCount === 0){
      return res.status(404).json({ message: 'Cannot find crop' });
    }
    res.json({ message: 'Crop deleted'})
  } catch {
    res.status(500).json({ message: err. message })
  }
})

module.exports = router