const express = require('express')
const router = express.Router()
const db = require('../models')
// const request = require('request')
// const cheerio = require('cheerio')
// const URL = 'https://www.homelessshelterdirectory.org/cgi-bin/id/city.cgi?city=Boston&state=MA'

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