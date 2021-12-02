const jwt = require('jsonwebtoken')
const User = require('../models/user')
const { jwtsecret } = require('../config.js');

//verify user is logged in
const auth = async (req, res, next) => {
    try {
        // retrieve user authorization from HTTPonly cookie with token
        const token = req.cookies.Authorization.replace('Bearer ', '')
        let decoded = jwt.verify(token, 'jwtsecret')
        decoded = Object.values(decoded);
        const decodedValue = decoded[0];
        const user = await User.findOne({_id: decodedValue, 'tokens.token':token})
        if (!user) {
            console.log('ERROR')
            throw new Error()
        }
        req.user = user
        req.token = token //tokens array
        next()
    } catch (e) {
        res.status(401).render('401', {
            error: 'Please authenticate.'})
    }
}

module.exports = auth