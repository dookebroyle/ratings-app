const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()
var bodyParser = require('body-parser')
// create application/json parser
var jsonParser = bodyParser.json()
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })


//create new user
router.post('/users/signup', urlencodedParser, async (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    })
    try{
        const token = await user.generateAuthToken()
        await user.save()
        //send cookie to browser
        res.cookie('Authorization', `Bearer ${token}`,{
            httpOnly: true,
            maxAge: 9000000,
            sameSite: true
        })
        res.status(201).render( 'home',{
            username: user.username,
        })
    } catch (e)  {
        res.status(400).send(e)
    }
})

//user login
router.post('/users/login', urlencodedParser, async (req, res) =>{
    try{
        const user = await User.findByCredentials(req.body.username, req.body.password)
        const token = await user.generateAuthToken()
        //send cookie to browser
        res.cookie('Authorization', `Bearer ${token}`,{
            httpOnly: true,
            maxAge: 9000000,
            sameSite: true
        })
        res.status(201).render( 'home',{
            user,
            token
    })

    } catch (e) {
        res.status(400).send()
    }
})

//user logout
router.post('/users/logout', urlencodedParser, async (req, res) => {
    try { 
        const user = await User.findByCredentials(req.body.username, req.body.password)
        req.user.tokens = req.user.tokens.filter( token => {
            return token.token !== req.token
        })
        await req.user.save()
        res.status(201).render( 'error',{
            title: 'Please sign in again'
    })
    } catch (e) { 
        res.status(500).send({
        })
    }
})

//user logout of all sessions
router.post('/users/logoutAll',urlencodedParser, async (req, res) => {
    try{
        req.user.tokens = []
        await req.user.save()
    } catch (e) {
        res.status(500).send()
    }
})

//update existing user
router.patch('/users/me', async (req, res) => {
    const allowedUpdates = [ 'username', 'password']
    const updates = Object.keys(req.body)
    const isValidOperation = updates.every( update => allowedUpdates.includes(update))
    if (!isValidOperation){
        return res.status(400).send({error: 'Invalid updates'})
    }
    try{
        updates.forEach( update => req.user[update] = req.body[update] )
        await req.user.save()
        res.send(req.user)
    }catch (e) {
        res.status(500).send(e)
    }
})

//delete user
router.delete('/users/me', async (req, res) => {
    try{
        await req.user.remove()
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router;