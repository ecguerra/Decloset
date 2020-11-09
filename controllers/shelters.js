const express = require('express')
const router = express.Router()
const db = require('../models')

// GET /shelters/search
router.get('/search',(req,res) => {
    res.render('shelters/search.ejs')
})

// GET /shelters/results
router.get('/results', (req,res) => {
    res.render('shelters/results.ejs')
})

// GET /shelters
router.get('/',(req,res) => {
    res.render('shelters/saved')
})

// GET /shelters/:id
router.get('/:id',(req,res) => {
    res.render('shelters/show.ejs')
})

module.exports = router