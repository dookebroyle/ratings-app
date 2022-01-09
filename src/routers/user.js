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
           user
        })
    } catch (e)  {
        res.status(400).render('400', {
            message: e,
            linkName: 'Sign In',
            user
        })
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
        res.status(400).render('400', {
            message: 'User and password combination not found. Please try again or create an account',
            linkName: 'Sign Up',
            username: req.body.username
        })
    }
})

//user logout of all sessions
router.post('/users/logoutAll', auth, async (req, res) => {
    try{
        req.user.tokens = []
        await req.user.save()
        res.status(201).render( 'index', {
        })
    } catch (e) {
        res.status(500).send()
    }
})

//read all ratings for logged in user
router.get('/home', auth,  async (req, res) => {
    try{
        res.status(200).render('home', {
            title: 'Home',
            user: req.user,
            linkName: 'Sign In'
        })
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router;