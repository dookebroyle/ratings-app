const request = require ('request');
//const { masterkey } = require('../config.js');


//find a list of all NY Times Bestseller Booklists
const booklist = (callback) => {
    const booklistUrl = `https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=${process.env.NYTIMES_API_KEY}`
    request({ url: booklistUrl, json: true }, async (error, res) => {
        if (error){
            callback('Unable to connect to NY Times API.', undefined)
        }
        else if (res.body.results.length == 0) {
            callback('No results found', undefined)
        }
        else{
            const data = await res.body.results
            const booklist = data.map(data => data.list_name);
            callback(undefined, booklist)
        }
    })
}


module.exports = booklist;