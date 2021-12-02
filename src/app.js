const express = require('express')
const path = require('path')
const app = express()
var bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const hbs = require('hbs')
const User = require('./models/user')
const userRouter = require('./routers/user')
const ratingRouter = require('./routers/rating')
const bookRouter = require('./routers/books')
const { port, mongodburl } = require('./config');
require('./db/mongoose')


//definte paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')

//setup handlebars, helpers, and views location
app.set('view engine', 'hbs')
const viewPath = path.join(__dirname, '../templates/views')
app.set('views', viewPath)
const partialsPath = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialsPath)



//set up static route for express
app.use(express.static(publicDirectoryPath))
app.use(express.json())
app.use(bodyParser.urlencoded({limit: '5000mb', extended: true, parameterLimit: 100000000000}))
app.use(cookieParser())
app.use(userRouter)
app.use(ratingRouter)
app.use(bookRouter)

//get home page with drop down list of all bestseller books
app.get('/',  (req, res) => {
    res.render('index', {
        title: 'Log In or Sign Up'
    })
})

app.get('/home',  (req, res) =>{
    res.render('home', {
        title: 'Home',
        user: req.user

    })
})




//write a rating/review for the selected book
app.get('/rating', (req, res) => {
    let bookTitle = req.query.booktitle
    bookTitle = bookTitle.replace(/-/g, ' ');
    res.render('rating', {
        title: 'Leave a review',
        bookID: req.query.bookid,
        bookTitle,
    })
})

//get a list of all of your ratings
app.get('/myratings', (req, res) => {
    res.render('myratings', {
        title: 'My Ratings'
    })
})


//get edit page for single rating
app.get('/myratings', (req, res) => {
    
    res.render('update-review', {
        title: 'Edit your review',
        bookName
    })
})





app.listen(port, () => {
    console.log(`App is up on port ${port}`)
})




