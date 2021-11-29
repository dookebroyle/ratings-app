
const ratingStars = [...document.getElementsByClassName("rating__star")];
const btn = document.querySelector("button");
const post = document.querySelector(".review-button");
const widget = document.querySelector(".star-widget");
const reviewForm = document.querySelector('#review-form')
const reviewText = document.querySelector('#review-input')

reviewForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const input = reviewText.value
    console.log(input)
    let selectedStars = null;
    ratingStars.forEach( (star) => {
        if (star.checked) {
            console.log(`${star.value} picked`)
           selectedStars = star.value
        } else{
            console.log(`${star.value} not picked`)
        }
    })
    console.log(selectedStars)
})


btn.onclick = ()=>{
 
    widget.style.display = "none";
    post.style.display = "block";
    return false;
  }