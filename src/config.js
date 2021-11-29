// config.js
const dotenv = require('dotenv');
const result = dotenv.config();

if (result.error) {
  throw result.error
}

module.exports = {
  masterkey: process.env.NYTIMES_API_KEY,
  port: process.env.PORT,
  mongodburl: process.env.MONGODB_URL,
};

