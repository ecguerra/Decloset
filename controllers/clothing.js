const express = require('express')
const router = express.Router()
const db = require('../models')

// GET /clothing
router.get('/', (req,res) => {
    res.render('clothing/index.ejs')
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