const mongoose = require('mongoose');
const { mongodburl } = require('../config.js');



mongoose.connect(mongodburl, {
    useNewUrlParser: true,
    //userCreateIndex: true
});
