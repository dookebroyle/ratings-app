// config.js
const dotenv = require('dotenv');
const result = dotenv.config();

if (result.error) {
  throw result.error
}

//these are defined in .env file. Make up jwtsecret. get NYTimes API key from site.
//mongoDB URL can either be Mongo Atlas path or local db
//require('../config.js') in all files that use
module.exports = {
  masterkey: process.env.NYTIMES_API_KEY,
  port: process.env.PORT,
  mongodburl: process.env.MONGODB_URL,
  jwtsecret: process.env.JWT_SECRET,
}

