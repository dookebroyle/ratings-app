const express = require('express')
const User = require('../models/user')
const router = new express.Router()
const auth = require('../middleware/auth')

//create new rating with logged in user as owner
router.post('/ratings', auth, async (req, res) =>{
    const rating = new Rating({
        ...req.body,
        owner: req.user._id
    })
    try{
        await rating.save()
        res.status(201).send(rating)
    } catch (e) {
        res.status(400).send()
    }
})

//read all ratings for logged in user using optional query strings
//get /ratings?limit=1&skip=20
//get /ratings?sortBy=createdAt:desc
router.get('/ratings',  auth, async (req, res) => {
    const match = {}
    const sort = {}
    if(req.query.completed){
        match.completed = req.query.completed === 'true'
    }

    if(req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = (parts[1] === 'desc' ? -1 : 1)
    }
    try{
        await req.user.populate({
            path: 'ratings',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()

        // const ratings = await Rating.find({ owner: req.user._id})
        res.send(req.user.ratings)
    } catch (e) {
        res.status(500).send()
    }
})

//read one rating by id
router.get('/ratings/:id', auth, async (req, res) => {
    const _id = req.params.id
    try{
        const rating = await Rating.findOne({_id, owner: req.user._id})
        if(!rating){
            res.status(404).send()
        }
        res.send(rating)
    } catch (e) {
        res.status(500).send()
    }
})

//update existing rating by id
router.patch('/ratings/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = [ 'description','completed']
    const isValidOperation = updates.every( update => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({error: 'Invalid updates'})
    }


    try{
        const rating = await Rating.findOne({_id: req.params.id, owner: req.user._id})
        if(!rating) {
            res.status(404).send()
        }
        updates.forEach( update => rating[update] = req.body[update])
        await rating.save()
        res.send(rating)
    } catch (e) {
        res.send(e)
    }
})

//delete a rating
router.delete('/ratings/:id', auth, async (req, res) => {
    try{
        const rating = await Rating.findOneAndDelete({_id: req.params.id, owner: req.user.id})
        if (!rating) {
            res.status(404).send()
        }
        res.send(rating)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router