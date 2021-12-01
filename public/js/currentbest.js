const reviewLink = document.querySelectorAll('.review-link')
const bookItems = document.querySelectorAll('.results')
const booksContainer = document.querySelector('#book-container')

// Send book data to rating page
reviewLink.forEach( (link) => {
    link.addEventListener('click', function (e)  {
        e.preventDefault();
        const bookId = link.getAttribute("id")
        //find the book object and book title that matches with id(bookrank)
        //linkid matches book id
        const previousElem =link.previousSibling.previousSibling.textContent
        const bookTitle = previousElem.replace(/\s/g, "-");

    fetch(`http://localhost:3000/rating?bookid=${bookId}&booktitle=${bookTitle}`).then((response) => {
        if (response.error){
            console.log(response.error)
        } else {
            
            window.location.replace(`http://localhost:3000/rating?bookid=${bookId}&booktitle=${bookTitle}`)
        }
        })
    })
})






