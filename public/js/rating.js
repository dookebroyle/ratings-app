
const ratingStars = document.querySelectorAll(".rating-star")
const btn = document.querySelector("button");
const post = document.querySelector(".review-button");
const widget = document.querySelector(".star-widget");
const reviewForm = document.querySelector('#review-form')
const reviewText = document.querySelector('#review-input')
let bookTitle = document.querySelector('#book-title-header').textContent

// reviewForm.addEventListener('submit', (e) => {
    
//     const input = reviewText.value.trim().replace(/\s/g, '-')
//     console.log(input)
//     const bookName = bookTitle.replace('Book Review for Book Title:', '')
   
    
//     ratingStars.forEach( (star) => {
//         if (star.checked) {
//             fetch(`http://localhost:3000/rating?stars=${star.id}&reviewtext=${input}&booktitle=${bookName}`).then((response) => {
//                 if (response.error){
//                     console.log(response.error)
//                 } else {
//                     console.log(response)
//                 }
//                 })
//         } 
//     })
// })


btn.onclick = ()=>{
 
    widget.style.display = "none";
    post.style.display = "block";
    return false;
  }