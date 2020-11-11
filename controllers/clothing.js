const express = require('express')
const router = express.Router()
const db = require('../models')
const isLoggedIn = require('../middleware/isLoggedIn.js')

// GET /clothing
router.get('/', isLoggedIn, (req,res) => {
    db.user.findByPk(req.user.id)
    .then(user => {
        user.getClothings().then(clothing => {
            res.render('clothing/index.ejs', {clothing: clothing})
        })
    })
    .catch(err => {
        console.log(err)
    })
})

// GET /clothing/new
router.get('/new', (req,res) => {
    res.render('clothing/new')
})

// POST /clothing/new
router.post('/', isLoggedIn, (req,res) => {
    db.category.findOrCreate({
        where: {name: req.body.category}
    })
    .then(([category, found]) => {
        category.createClothing({
            userId: req.user.id,
            style: req.body.style,
            status: req.body.status,
            brand: req.body.brand,
            material: req.body.material,
            color: req.body.color,
            condition: req.body.condition
        })
        res.redirect('/clothing')
    })
    .catch(err => {
        console.log(err)
    })
})

// GET /clothing/:id
router.get('/:id', (req,res) => {
    res.render('clothing/show')
})

// GET /clothing/edit/:id
router.get('/edit/:id', (req,res) => {
    res.render('clothing/edit')
})

module.exports = router