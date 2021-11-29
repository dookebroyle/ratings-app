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
        res.status(201).render( 'home',{
            username: user.username
        })
        //view profile
        router.get('/users/me', auth,  async (req, res) => {
            res.send(req.user)
        })
    } catch (e)  {
        res.status(400).send(e)
    }
})



//user login
router.post('/users/login',urlencodedParser, async (req, res) =>{
    try{
        //res.send(req.body)
        const user = await User.findByCredentials(req.body.username, req.body.password)
        const token = await user.generateAuthToken()
       // res.send({user, token})
        res.status(201).render( 'home',{
            username: user.username
     })
    //view profile
    router.get('/users/me', auth,  async (req, res) => {
        res.send(req.user)
    })
    } catch (e) {
        res.status(400).send()
    }
})

//user logout
router.post('/users/logout', auth, async (req, res) => {
    try { 
        req.user.tokens = req.user.tokens.filter( token => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    } catch (e) { 
        res.status(500).send()
    }
})

//user logout of all sessions
router.post('/users/logoutAll', auth, async (req, res) => {
    try{
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

//update existing user
router.patch('/users/me', auth, async (req, res) => {
    const allowedUpdates = [ 'name', 'email', 'password', 'age']
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
router.delete('/users/me', auth, async (req, res) => {
    try{
        await req.user.remove()
        await sendCancelEmail(req.user.email, req.user.name)
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})




module.exports = router;