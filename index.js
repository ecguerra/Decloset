require('dotenv').config()
const express = require('express')
const app = express()
const ejsLayouts = require('express-ejs-layouts')
const session = require('express-session')
const passport = require('./config/ppConfig.js')
const flash = require('connect-flash')
const isLoggedIn = require('./middleware/isLoggedIn.js')
const port = process.env.PORT || 8000

app.set('view engine','ejs')
app.use(ejsLayouts)

// body parser middleware (makes req.body work)
app.use(express.urlencoded({extended: false}))

// session middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

// passport middleware
app.use(passport.initialize())
app.use(passport.session())

// flash middleware // *** HAS TO GO AFTER SESSION MIDDLEWARE ***
app.use(flash())

// CUSTOM MIDDLEWARE
app.use((req,res,next) => {
    // before every route, attach the flash messages and current user to res.locals
    // this will give us access to these values in all our ejs pages // if we didn't set this up, we'd have to send the data to every page
    res.locals.alerts = req.flash()
    res.locals.currentUser = req.user
    next() // move on to next piece of middleware
})

app.get('/',(req,res)=>{
    res.render('home.ejs')
})

app.use('/auth',require('./controllers/auth.js'))

app.get('/profile', isLoggedIn, (req,res) => { // add the optional middleware to specific routes
    res.render('profile.ejs') // don't have to send all the user data through because of custom middleware
})

app.listen(port, ()=>{
    console.log('Port 8000')
})