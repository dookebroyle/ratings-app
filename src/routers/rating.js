const express = require('express')
const User = require('../models/user')
const Rating = require('../models/rating')
const router = new express.Router()
const auth = require('../middleware/auth')


//create new rating with logged in user as owner
router.post('/ratings', auth, async (req, res) =>{
    try{
        const bookTitle = req.body.booktitle.replace(/-/g, ' ')
        
        const rating = new Rating({
            bookName: bookTitle,
            stars: req.body.rate,
            owner: req.user._id,
            reviewText: req.body.input
            //todo 
            //set this to pass a book object instead -- ran out of time
        })
        await rating.save()
        res.status(201).render('message',{
            title: "Rating submitted",
            bookTitle,
            rating,
            user: req.user
        })
    } catch (e) {
        res.status(400).send()
    }
})

//read all ratings for logged in user
router.get('/myratings', auth,  async (req, res) => {
    try{
        const ratings = await Rating.find({ owner: req.user._id})
        
        res.status(200).render('myratings', {
            title: 'My Book Ratings',
            ratings,
            user: req.user
        })
    } catch (e) {
        res.status(500).send()
    }
})

//read one rating by name and either edit or delete
router.get('/ratings/edit', auth,  async (req, res) => {
    let bookName = Object.keys(req.query)
    let choice = Object.values(req.query)
    bookName = bookName.toString()
    //edit fields only
    if (choice.includes('Edit')){
        try{
            const rating = await Rating.findOne({bookName})
            if(!rating){
                res.status(404).send()
            }
            res.status(200).render('update-review', {
                user: req.user,
                bookName
            })
        } catch (e) {
            res.status(500).send()
        }
    } 
})

//update existing rating by searching for book name
//todo - after updating ratings post route to send book object, alter this route
router.patch('/ratings/postupdate', auth, async (req, res) => {
    
    const filter = { bookName: req.body.bookTitle}
    const update = {stars: req.body.stars, reviewText: req.body.input}
    try{
        const rating = await Rating.findOneAndUpdate(filter, update)
        if(!rating) {
            console.log('book not found')
            res.status(404).send()
        }
        rating = new Rating({
            bookName: bookTitle,
            stars: req.body.rate,
            owner: req.user._id,
            reviewText: req.body.input
            
            // TO DO
            // set this to pass a book object instead
        })
        await rating.save()
        res.status(200).render('message', {
            title: 'Review Updated',
            message: 'Rating updated',
            user: req.user
        })
        
        res.send(rating)
    } catch (e) {
        res.send(e)
    }
})

//delete a rating
router.delete('/ratings/delete', auth, async (req, res) => {
    const filter = { 
        bookName: req.query.bookTitle
    }
    try{
        const rating = await Rating.findOneAndDelete({filter})
        if (!rating) {
            res.status(404).send()
        }
        
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router