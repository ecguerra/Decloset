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
router.get('/new', isLoggedIn, (req,res) => {
    res.render('clothing/new')
})

// POST /clothing/new
router.post('/', isLoggedIn, (req,res) => {
    db.category.findOrCreate({
        where: {name: req.body.category}
    })
    .then(([category, created]) => {
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
router.get('/:id', isLoggedIn, (req,res) => {
    db.clothing.findOne({
        where: {id: req.params.id},
        include: [db.category, db.shelter]
    })
    .then(clothing => {
        res.render('clothing/show', {clothing: clothing})
    })
    .catch(err => {
        console.log(err)
    })
})

// GET /clothing/edit/:id
router.get('/edit/:id', isLoggedIn, (req,res) => {
    db.clothing.findOne({
        where: {id: req.params.id},
        include: [db.category, db.shelter]
    })
    .then(clothing => {
        res.render('clothing/edit', {clothing: clothing})
    })
    .catch(err => {
        console.log(err)
    })
})

// PUT /clothing/edit/:id
router.put('/:id', async(req,res) => {
    try{
        await db.clothing.update({
            style: req.body.style,
            status: req.body.status,
            brand: req.body.brand,
            material: req.body.material,
            color: req.body.color,
            condition: req.body.condition
        },
        {
            where: {id: req.body.id},
            include: [db.category]
        })
        const foundClothing = await db.clothing.findOne({
            where: {id: req.body.id},
            include: [db.category]
        })
        const [foundOrCreated, isCreated] = await db.category.findOrCreate({
            where: {name: req.body.category}
        })
        await foundClothing.setCategory(foundOrCreated)
        res.redirect(`/clothing/${req.body.id}`)
    }
    catch(err){
        console.log(err)
        res.redirect(`/clothing/${req.body.id}`)
    }
})

// DELETE /clothing/:id
router.delete('/:id', (req,res) => {
    db.clothing.destroy({
        where: {id: req.body.id}
    })
    .then(deleted => {
        res.redirect('/clothing')
    })
    .catch(err => {
        console.log(err)
    })
})

module.exports = router