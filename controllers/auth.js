const express = require('express')
const router = express.Router()

//--- SIGN UP ---

// GET /
router.get('/signup',(req,res)=>{
    // res.send('GET /auth/signup')
    res.render('auth/signup')
})

router.post('/signup',(req,res)=>{
    console.log('POST /auth/signup')
    res.redirect('/auth/login')
})

//--- LOGIN ---
router.get('/login', (req,res)=>{
    // res.send('GET /auth/login')
    res.render('auth/login')
})

router.post('/login',(req,res)=>{
    console.log('POST auth/login')
    res.redirect('/')
})

module.exports = router