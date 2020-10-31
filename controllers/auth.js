const express = require('express')
const router = express.Router()
const db = require('../models')

//--- SIGN UP ---

// GET /
router.get('/signup',(req,res)=>{
    // res.send('GET /auth/signup')
    res.render('auth/signup')
})

router.post('/signup',(req,res)=>{
    console.log('sign up form user input', req.body)

    db.user.findOrCreate({
        where: {email: req.body.email},
        defaults: {
            name: req.body.name,
            password: req.body.password
        }
    })
    .then(([createdUser, created])=>{
        if(!created) console.log('An account associated with that email address already exists! Try logging in') 
        else {
            console.log('created following user:', createdUser)
        }
    })
    res.redirect('/auth/login')
})

//--- LOGIN ---
router.get('/login', (req,res)=>{
    // res.send('GET /auth/login')
    res.render('auth/login')
})

router.post('/login',(req,res)=>{
    console.log('login form user input', req.body)
    res.redirect('/')
})

module.exports = router