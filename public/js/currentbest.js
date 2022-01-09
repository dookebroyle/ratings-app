const reviewLink = document.querySelectorAll('.review-link')
const bookItems = document.querySelectorAll('.results')
const booksContainer = document.querySelector('#book-container')
const domain = 'https://doyle-book-ratings-app.herokuapp.com'

// Send book data to rating page
reviewLink.forEach( (link) => {
    link.addEventListener('click', function (e)  {
        
        const bookId = link.getAttribute("id")
        let previousElem =link.previousSibling.previousSibling.textContent
        previousElem = previousElem.replace('Book Title:', '')
        const bookTitle = previousElem.replace(/\s/g, "-")
        

    fetch(`${domain}/ratings?bookid=${bookId}&booktitle=${bookTitle}`).then((response) => {
        if (response.error){
            console.log(response.error)
        } else {
            
            window.location.replace(`${domain}/rating?bookid=${bookId}&booktitle=${bookTitle}`)
        }
        })
    })
})

document.getElementById("body").onscroll = function myFunction() {  
    var scrolltotop = document.scrollingElement.scrollTop;
    var target = document.getElementById("background-container");
    var xvalue = "center";
    var factor = 0.1;
    var yvalue = scrolltotop * factor;
    target.style.backgroundPosition = xvalue + " " + yvalue + "px";
  }






