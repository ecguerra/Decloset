const express = require('express')
const router = express.Router()
const db = require('../models')
const request = require('request')
const cheerio = require('cheerio')
let URL
const isLoggedIn = require('../middleware/isLoggedIn.js')

// GET /shelters/search
router.get('/search', (req,res) => {
    res.render('shelters/search.ejs')
})

//POST /shelters/search
router.post('/results', (req,res) => {
    URL = `https://www.homelessshelterdirectory.org/cgi-bin/id/city.cgi?city=${req.body.search_city}&state=${req.body.search_state}`
    console.log(req.body.search_city)
    console.log(req.body.search_state)
    res.redirect('/shelters/results')
})


// GET /shelters/results
router.get('/results',(req,res) => {
    request(URL, (error, response, body) => {
        let $ = cheerio.load(body)
        let results = $('.listings .item_content')
        let resultNames = results.map((index,element) => {
            let filterName = $(element).find('a').text()
            filterName = filterName.substring(0, filterName.length - 18)
            urlId = $(element).find('a').attr('href')
            urlId = urlId.substring(urlId.indexOf("=")+1)
            return {
                name: filterName,
                detail: urlId
            }
        })
        res.render('shelters/results.ejs',{shelters: resultNames.get()})
    })
})

// GET /shelters/results/:id
router.get('/results/:id',(req,res) => {
    let URL = `https://www.homelessshelterdirectory.org/cgi-bin/id/shelter.cgi?shelter=${req.params.id}`
    request(URL, (error, response, body) => {
        let $ = cheerio.load(body)
        let results = $('.entry_content')
        let resultDetails = results.map((index,element) => {
            let fullDetails = $(element).find('p').text()
            let addr = fullDetails.substring(fullDetails.indexOf(':'),0)
            
            let cityState = $(element).find('h3').text()
            city = cityState.substring(cityState.lastIndexOf('-')+2,cityState.indexOf(','))
            
            let street = addr.substring(44,addr.length-addr.indexOf(city)+4)
            // let state = addr.substring(addr.indexOf(',')+2,addr.indexOf(',')+4)
            let state = cityState.substring(cityState.lastIndexOf(',')+2,cityState.length-1)
            // let zip = addr.substring(addr.indexOf(',')+5,addr.indexOf(',')+10)
            let zip = addr.substring(addr.indexOf(state)+3,addr.indexOf(state)+8)
            let phone = fullDetails.substring(fullDetails.indexOf('Phone:')+7,fullDetails.indexOf('Phone:')+21)          
            return {
                name: $(element).find('h3').text(),
                detail: req.params.id,
                street: street,
                city: city,
                state: state,
                zip: zip,
                phone: phone
            }
        })
        res.render('shelters/show.ejs',{shelter: resultDetails.get()})
        // res.send(resultDetails.get())
    })
})

// POST /shelters/results/:id
router.post('/',isLoggedIn,(req,res) => {
    db.shelter.findOrCreate({
        where: {name: req.body.name},

        defaults: {
            detail: req.body.detail,
            phone: req.body.phone,
            address: req.body.address,
            address_city: req.body.address_city,
            address_state: req.body.address_state,
            address_zip: req.body.address_zip
        }
    })
    .then(([shelter, created])=> {
        db.user.findByPk(req.user.id)
        .then(user => {
            shelter.addUser(user)
        })
        res.redirect('/shelters')
    })
    .catch(err => {
        console.log(err)
    })
})

// GET /shelters
router.get('/',isLoggedIn, (req,res) => {
    db.user.findByPk(req.user.id)
    .then(user=> {
        user.getShelters().then(shelters => {
            res.render('shelters/saved', {shelters: shelters})
        })
    })
    .catch(err => {
        console.log(err)
    })
})

// DELETE /shelters
router.delete('/', isLoggedIn, (req,res) => {
    db.UserShelter.destroy({
        where: {
            shelterId: req.body.id,
            userId: req.user.id
        }
    })
    .then(destroyed => {
        res.redirect('/shelters')
    })
})

// GET /shelters/details/:id
router.get('/details/:id', isLoggedIn, (req,res) => {
    db.shelter.findOne({
        where: {id: req.params.id}
    })
    .then(shelter => {
        res.render('shelters/detail', { shelter: shelter })
    })
    .catch(err => {
        console.log(err)
    })
})

// DELETE /shelters/details/:id
router.delete('/', isLoggedIn, (req,res) => {
    db.UserShelter.destroy({
        where: {
            shelterId: req.body.id,
            userId: req.user.id
        }
    })
    .then(destroyed => {
        res.redirect('/shelters')
    })
})


module.exports = router