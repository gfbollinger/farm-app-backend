const express = require('express')
const router = express.Router()
const Category = require('./../models/Category')

// Get all Categories
router.get('/', async(req, res) => {
  try {
    const categories = await Category.find()
    res.json(categories)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Get a single category
router.get('/:id', async(req, res) => {
  try {
    const category = await Category.findById(req.params.id)
    if (category === null){
      return res.status(404).json({ message: 'Cannot find category' })
    }
    res.json(category)
  } catch(err){
    res.status(500).json({ message: err.message })
  }
})

// Create a new category
router.post('/', async(req, res) => {
  const category = new Category({
    name: req.body.name,
    description: req.body.description
  })

  try{
    const newCategory = await category.save()
    res.status(201).json(newCategory)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Update a category
router.patch('/:id', async(req, res) => {
  try{
    const category = await Category.findById(req.params.id)
    if ( category === null ) {
      res.status(404).json({ message: 'Cannot find category'})
    }

    if( req.body.name !== null ){
      category.name = req.body.name
    }

    if( req.body.description !== null ){
      category.description = req.body.description
    }

    const updatedCategory =  await category.save()
    res.json(updatedCategory)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Delete category
router.delete('/:id', async (req, res) => {
  try {
    const result = await Category.deleteOne({ _id: req.params.id })

    if (result.deletedCount === 0){
      return res.status(404).json({ message: 'Cannot find category' });
    }
    res.json({ message: 'Category deleted'})
  } catch {
    res.status(500).json({ message: err. message })
  }
})

module.exports = router