const jwt = require('jsonwebtoken')
const User = require('../models/user')
const { jwtsecret } = require('../config.js');


const auth = async (req, res, next) => {
    
    try {
        const cookies = req.cookies.Authorization.replace('Bearer ', '')
      
        const decoded = jwt.verify(token, 'thisistoken')

        console.log(decoded)
        const user = await User.findOne({_id: decoded._id.toString(), 'tokens.token':token})

        if (!user) {
            throw new Error()
        }
        req.user = user
        req.token = token //tokens array
        next()
    } catch (e) {
        res.status(401).send({error: 'Please authenticate.'})
    }
}

module.exports = auth