const express = require('express')
const User = require('../models/user')
const router = new express.Router()
const auth = require('../middleware/auth')
const booklist = require('../utils/renderBooklist')
const bestSellers = require('../utils/renderBooks')



// get a list of all books on the selected booklist
router.get('/currentbest', auth, (req, res) => {
    bestSellers ( 'Hardcover Fiction', (error, bookData) => {
        if(error) {
            return  res.send({error})
        }
        res.render('currentbest', {
            title: 'Hardcover Fiction Bestsellers',
            bookData,
            booklistName: req.query.booklistName,
            booklist:bookData
        })
    })
})

router.get('/getbooklists', auth, (req, res) => {
    booklist ((error, booklistData) =>{
        res.render('getbooklists', {
            title: 'Find NY Times Bestseller Lists',
            booklist: booklistData
        })
    })
})
router.get('/fetchbooks', auth, (req, res) => {
    let name = req.query.booklistName
    name = name.trim()
    const listName = name.replace(/-/g, ' ')
    bestSellers (listName, (error, bookData) => {
        if(error) {
            return  res.send({error})
        }
        res.status(200).render('currentbest',{
            title: `${listName} Bestsellers Books`,
            bookData,
            booklistName: req.query.booklistName,
            booklist:bookData
        })

    })
})

module.exports = router;