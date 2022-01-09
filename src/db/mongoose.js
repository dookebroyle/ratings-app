const mongoose = require('mongoose');
//const { mongodburl } = require('../config.js');


//connect to database
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    //userCreateIndex: true
});
