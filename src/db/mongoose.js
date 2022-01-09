const mongoose = require('mongoose');
//const { mongodburl } = require('../config.js');
require('dotenv').config()


//connect to database
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    //userCreateIndex: true
});
