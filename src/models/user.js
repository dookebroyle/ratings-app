const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Rating = require ('./rating')
const {jwtsecret} = require('../config')

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            if (value.toLowerCase().includes('password')){
                throw new Error('Password cannot include the word password.')
            }
            if(value.includes(' ')){
                throw new Error('Password cannot include spaces')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }], 
}, {
    timestamps: true
})

userSchema.virtual('ratings', {
    ref: 'Rating',
    localField: '_id',
    foreignField: 'owner'
})
//
userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()
    
    delete userObject.password
    delete userObject.tokens
    return userObject
}

// Authenticate credentials
userSchema.statics.findByCredentials = async (username, password) => {
    const user = await User.findOne({username})
    if(!user){
        throw new Error('Username not found')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('Authentication error')
    }
    return user;
}

userSchema.methods.generateAuthToken = async function () {
    const user = this

    token = jwt.sign({ _id: user._id.toString() }, 'jwtsecret')
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}


//hash plain text password before saving
userSchema.pre('save', async function(next) {
    const user = this

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8);
    }
    next()
})

//delete user ratings when user is removed
userSchema.pre('remove', async function (next) {
    const user = this
    await Rating.deleteMany({ owner: user._id})
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User