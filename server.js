const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/products.js');
const productSeed = require('./models/productSeed.js');
const app = express();
require('dotenv').config();

mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

// Database Connection Error/Success
// Define callback functions for various events
const db = mongoose.connection
db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

//middleware
app.use(express.urlencoded({ extended: true }));

// Routes


//seed route 

app.get('/products/seed', (req,res) => {
    Product.deleteMany({}, (error, allProducts) => {});

    Product.create(productSeed, (error, data) => {
        res.redirect('/products')
    })
})
// I
app.get('/products/', (req,res) => {
    Product.find({}, (error, allProducts) => {
        res.render('index.ejs', {
            products: allProducts,
        })
    })
})
// N
app.get('/products/new', (req,res) => {
    res.render('new.ejs')
})
// D
  
// U
  
// C
app.post
// S
app.get('/products/:id', )

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})