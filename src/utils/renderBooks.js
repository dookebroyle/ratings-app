const request = require ('request');
const { masterkey } = require('../config.js');

const bestSellers = (callback) => {
    const bestsellerUrl = `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${masterkey}`

    request({ url: bestsellerUrl, json: true }, async (error, res) => {
        if (error){
            callback({Error:'Unable to connect to NY Times API.'}, undefined)
        }
        else if (res.body.results.length == 0) {
            callback({Error:'No results found'}, undefined)
        }
        else{
            const bestSellers = await res.body.results.books.map((item) => {
                return {
                    rank: item.rank,
                    title: item.title,
                    author: item.author,
                    publisher: item.publisher,
                    image: item.book_image,
                };
            });
            callback(undefined, bestSellers);
        }
      
    })
}

module.exports = bestSellers;