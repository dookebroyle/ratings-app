const jwt = require('jsonwebtoken')
const User = require('../models/user')
//const { jwtsecret } = require('../config.js');

require('dotenv').config()
const jwtsecret = process.env.JWT_SECRET


//verify user is logged in
const auth = async (req, res, next) => {
        try {
            // retrieve user authorization from HTTPonly cookie with token
            const token = req.cookies.Authorization.replace('Bearer ', '')
            let decoded = jwt.verify(token, jwtsecret)
            decoded = Object.values(decoded);
            const decodedValue = decoded[0];
            const user = await User.findOne({_id: decodedValue, 'tokens.token':token})
            if (!user) {
                console.log('User not found')
                throw new Error()
            }
            req.user = user
            req.token = token //tokens array
            next()
        } catch (e) {
            res.status(401).render('401', {
                user: req.user,
                linkName: 'Sign In'
            })
        }
    }



module.exports = auth