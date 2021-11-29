const express = require('express')
const path = require('path')
const app = express()
const hbs = require('hbs')
const User = require('./models/user')
const userRouter = require('./routers/user')
const ratingRouter = require('./routers/rating')
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

const booklist = require('./utils/renderBooklist')
const bestSellers = require('./utils/renderBooks')

//set up static route for express
app.use(express.static(publicDirectoryPath))
app.use(express.json())

app.use(userRouter)
app.use(ratingRouter)

//get home page with drop down list of all bestseller books
app.get('/',  (req, res) => {
    res.render('index')
})

app.get('/home', (req, res) =>{
    if(req.query) {
        res.render('home', {
            
        })
}
})

// get a list of all books on the selected booklist
app.get('/currentbest', (req, res) => {
    bestSellers ((error, bookData) => {
        if(error) {
            return  res.send({error})
        }
        res.render('currentbest', {
            bookData,
            booklistName: req.query.booklistName,
            booklist:bookData
        })
    })
})

app.get('/getbooklists', (req, res) => {
    booklist ((error, booklistData) =>{
        res.render('getbooklists', {
            title: 'Find NY Times Bestseller Lists',
            booklist: booklistData
        })
    })
})


//write a rating/review for the selected book
app.get('/rating', (req, res) => {
    let bookTitle = req.query.booktitle.toString();
    bookTitle = bookTitle.replace("-", ' ');

    res.render('rating', {
        title: 'Leave a review',
        bookID: req.query.bookid,
        bookTitle: bookTitle
    })
})

//get a list of all of your ratings
app.get('/myratings', (req, res) => {
    res.render('myratings', {
        title: 'My Ratings'
    })
})



app.listen(port, () => {
    console.log(`App is up on port ${port}`)
})




