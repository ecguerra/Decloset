const express = require('express')
const router = express.Router()
const db = require('../models')
const request = require('request')
const cheerio = require('cheerio')
let URL = 'https://www.homelessshelterdirectory.org/cgi-bin/id/city.cgi?city=Boston&state=MA'

// GET /shelters/search
router.get('/search', (req,res) => {
    res.render('shelters/search.ejs')
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

// GET /shelters/:id
router.get('/:id',(req,res) => {
    let URL = `https://www.homelessshelterdirectory.org/cgi-bin/id/shelter.cgi?shelter=${req.params.id}`
    request(URL, (error, response, body) => {
        let $ = cheerio.load(body)
        let results = $('.entry_content')
        let resultDetails = results.map((index,element) => {
            let fullDetails = $(element).find('p').text()
            let addr = fullDetails.substring(fullDetails.indexOf(':'),0)
            let city = $(element).find('h3').text()

            city = city.substring(city.lastIndexOf('-')+2,city.indexOf(','))
            
            let street = addr.substring(0,addr.length-addr.indexOf(city)+4)
            let state = addr.substring(addr.indexOf(',')+2,addr.indexOf(',')+4)
            let zip = addr.substring(addr.indexOf(',')+5,addr.indexOf(',')+10)
            let phone = fullDetails.substring(fullDetails.indexOf('Phone:')+7,fullDetails.indexOf('Phone:')+23)          
            return {
                name: $(element).find('h3').text(),
                address: $(element).find('p').text(),
                addr: addr,
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

// GET /shelters
router.get('/',(req,res) => {
    res.render('shelters/saved')
})

module.exports = router