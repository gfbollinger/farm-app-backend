const express = require('express')
const router = express.Router()
const Category = require('./../models/Category')
const PlantType = require('./../models/PlantType')

// Get all Categories
/* router.get('/', async(req, res) => {
  try {
    const categories = await Category.find()
    res.json(categories)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}) */

// Get all Categories with Subcategories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find({ parentId: null }).populate({
      path: 'subcategories',
      populate: {
        path: 'subcategories',
        populate: {
          path: 'subcategories',
          populate: {
            path: 'category',
            model: 'PlantType'
          }
        }
      }
    })
    res.json(categories)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

/* router.get('/categories-with-types', async (req, res) => {
  try {
    // 1. Encontrar todos los PlantTypes
    const plantTypes = await PlantType.find({}).populate('category');

    // 2. Encontrar todas las categorías y sus subcategorías
    const categories = await Category.find({}).populate('subcategories');

    // 3. Organizar las categorías bajo cada PlantType
    const response = plantTypes.map(plantType => {
      // Encontrar las categorías asociadas con el PlantType actual
      const associatedCategories = categories.filter(category => 
        category._id.equals(plantType.category)
      );

      // Mapear las categorías para incluir sus subcategorías
      const categoriesWithSubcategories = associatedCategories.map(category => ({
        name: category.name,
        description: category.description,
        subcategories: category.subcategories.map(sub => ({
          name: sub.name,
          description: sub.description
        }))
      }));

      return {
        name: plantType.name,
        description: plantType.description,
        categories: categoriesWithSubcategories
      };
    });

    res.json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}); */

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
router.post('/', async (req, res) => {
  try {
    // Search plantType
    const plantType = await PlantType.findById(req.body.typeId);
    if (!plantType) {
      return res.status(404).json({ message: 'PlantType not found' });
    }
    console.log(plantType)

    const category = new Category({
      name: req.body.name,
      description: req.body.description,
      plantType: [{ _id: plantType._id, name: plantType.name }]
    });

    const newCategory = await category.save();
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Create a new subcategory and update the parent category
router.post('/:id/subcategories', async (req, res) => {
  const { id } = req.params
  const { name, description, parentId } = req.body

  try{
    // Step 1: Create the new subcategory
    const newSubCategory = new Category({ name, description, parentId })
    const savedSubCategory = await newSubCategory.save()

    // Step 2: Update the parent to include the new subcategory
    const parentCategory = await Category.findById(id)
    if (!parentCategory) {
      res.status(404).json({ message: `Couldn't find parent category` })
    }

    parentCategory.subcategories.push(savedSubCategory._id)
    await parentCategory.save()

    res.status(201).json(savedSubCategory)
  } catch (err){
    res.status(400).json({ message: err.message})
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