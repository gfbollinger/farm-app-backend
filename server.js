require("dotenv").config();
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cloudinary = require('cloudinary').v2
const Multer = require('multer')
const plantRoutes = require('./routes/plants')
const categoryRoutes = require('./routes/categories')
const plantTypeRoutes = require('./routes/plantTypes')

const app = express()

// Middleware
app.use(bodyParser.json())

// Cors Middleware
app.use(cors({
  origin: 'http://localhost:3000'
}))

// Routes
app.use('/api/plants', plantRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/plant-types', plantTypeRoutes)

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/farmManager')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(`Couldn't connect con MongoDB`, err))


// Set up our Cloudinary SDK and define a function that will help us with file uploads
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
async function handleUpload(file) {
  const res = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });
  return res;
}

// Multer middleware
const storage = new Multer.memoryStorage();
const upload = Multer({
  storage,
});

// Upload image
app.post("/upload", upload.single("my_file"), async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    const cldRes = await handleUpload(dataURI);
    res.json(cldRes);
  } catch (error) {
    console.log(error);
    res.send({
      message: error.message,
    });
  }
});

// Start server
const port = process.env.PORT || 5555
app.listen(port, () => console.log(`Listening on port ${port}`))