const express = require('express');
const router = express.Router();
const Product = require('../models/products')

//seed route 
const productSeed = require('../models/productSeed');
router.get('/', (req,res) => {
    res.render('root.ejs');
})
router.get('/seed', (req,res) => {
    Product.deleteMany({}, (error, allProducts) => {});

    Product.create(productSeed, (error, data) => {
        res.redirect('/products')
    })
})


// I
router.get('/', (req,res) => {
    Product.find({}, (error, allProducts) => {
        res.render('index.ejs', {
            products: allProducts,
        })
    })
})
// N
router.get('/new', (req,res) => {
    res.render('new.ejs')
})
// D
router.delete("/:id", (req,res) => {
    Product.findByIdAndRemove(req.params.id,(err, data) => {
        res.redirect("/products")
    })
})
// U
router.put("/:id", (req,res) => {
    Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new:true,
        },
        (error, updatedProduct) => {
            res.redirect(`/products/${req.params.id}`)
        },

    )
    
})
// update route for buy button
router.put("/:id/buy", (req,res) => {
    Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new:true,
        },
        (error, updatedProduct) => {
            updatedProduct.qty -= 1 
            updatedProduct.save()
            res.redirect(`/products/${req.params.id}`)
        },
    )
})

// C
router.post('/', (req,res) => {
    Product.create(req.body, (error,createdProduct) => {
        res.redirect('/products')
    })
})


// E

router.get('/:id/edit', (req,res) => {
    Product.findById(req.params.id, (error, foundProduct) => {
        res.render('edit.ejs', {
            product:foundProduct,
        })
    })
})
// S
router.get('/:id', (req,res) => {
    Product.findById(req.params.id, (err, foundProduct) => {
        res.render('show.ejs', {
            product:foundProduct,
        })
    })
})

module.exports= router;