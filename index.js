const express = require('express')
const app = express()
const ejsLayouts = require('express-ejs-layouts')
const port = process.env.PORT || 8000

app.set('view engine','ejs')
app.use(ejsLayouts)

app.get('/',(req,res)=>{
    res.send('Express Auth Home Route')
})

app.use('/auth',require('./controllers/auth.js'))

app.listen(port, ()=>{
    console.log('Port 8000')
})