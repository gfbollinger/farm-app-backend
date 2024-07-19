const express = require('express')
const router = express.Router()
const PlantType = require('./../models/PlantType')

// Get all plant types:
router.get('/', async (req, res) => {
  try{
    const plantTypes = await PlantType.find()
    res.json(plantTypes)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router