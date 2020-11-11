const express = require('express')
const router = express.Router()
const db = require('../models')
const passport = require('../config/ppConfig.js')

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
            password: req.body.password,
            city: req.body.city,
            state: req.body.state,
            zip: req.body.zip
        }
    })
    .then(([createdUser, created])=>{
        if(!created) {
            // console.log('An account associated with that email address already exists! Try logging in')
            req.flash('error', 'An account associated with that email address already exists! Try logging in')
            res.redirect('/auth/login')
        } 
        else {
            console.log('created following user:', createdUser)
            passport.authenticate('local', {
                successRedirect: '/', // this is an unordered list, so it doesn't matter which of these comes first
                successFlash: 'Account created and logged in!' // passport uses flash, so we don't have to declare it
            }) (req, res) // IIFE = immediately invoked function
        }
    })
    .catch(err =>{
        // console.log(err)
        req.flash('error', err.message)
        res.redirect('/auth/signup')
    })
})
//--- LOGIN ---
router.get('/login', (req,res)=>{
    // res.send('GET /auth/login')
    res.render('auth/login')
})

router.post('/login', passport.authenticate('local', {
    failureRedirect: '/auth/login', // this basically an if statement - setting up options
    successRedirect: '/',
    failureFlash: 'Invalid email or password',
    successFlash: 'You are now logged in!'
}))

//--- LOG OUT ---
router.get('/logout', (req,res) => {
    req.logout() // logout is part of passport
    req.flash('success','Successfully logged out!') 
    res.redirect('/')
})

module.exports = router