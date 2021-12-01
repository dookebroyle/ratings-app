
const ratingStars = document.querySelectorAll(".rating-star")
const btn = document.querySelector("button");
const post = document.querySelector(".review-button");
const widget = document.querySelector(".star-widget");
const reviewForm = document.querySelector('#review-form')
const reviewText = document.querySelector('#review-input')

reviewForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const input = reviewText.value.trim().replace(/\s/g, '-')
    ratingStars.forEach( (star) => {
        if (star.checked) {
            
            //this needs access to user ID

            fetch(`http://localhost:3000/ratings?stars=${star.id}&reviewtext=${input}&`).then((response) => {
                if (response.error){
                    console.log(response.error)
                } else {
                    console.log(response)
                }
                })
                //window.location.replace(`http://localhost:3000/fetchbooks?booklistName=${listName}`);







        } else {
            
        }
    })
    
})


btn.onclick = ()=>{
 
    widget.style.display = "none";
    post.style.display = "block";
    return false;
  }