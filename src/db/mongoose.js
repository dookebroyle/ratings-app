const mongoose = require('mongoose');
const { mongodburl } = require('../config.js');


//connect to database
mongoose.connect(mongodburl, {
    useNewUrlParser: true,
    //userCreateIndex: true
});
