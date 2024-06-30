const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cropRoutes = require('./routes/crops')
const categoryRoutes = require('./routes/categories')

const app = express()

// Middleware
app.use(bodyParser.json())

// Routes
app.use('/api/crops', cropRoutes)
app.use('/api/categories', categoryRoutes)

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/farmManager')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(`Couldn't connect con MongoDB`, err))

// Start server
const port = process.env.PORT || 5555
app.listen(port, () => console.log(`Listening on port ${port}`))