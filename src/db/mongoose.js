const mongoose = require('mongoose');

MONGODB_URL='mongodb://127.0.0.1:27017/ratings-app-api'

mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    //userCreateIndex: true
});
