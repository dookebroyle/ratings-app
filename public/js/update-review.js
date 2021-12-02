const updateForm = document.querySelector('#update-form')


updateForm.addEventListener('submit', (e) => {
    e.preventDefault()
    let bookTitle = document.querySelector('#booktitle').value
    let stars = document.querySelector('input[name="rate"]:checked').value;
    
    let input = document.querySelector('#review-input').value

    fetch(`http://localhost:3000/ratings/postupdate`, {
        method: "PATCH",
        headers: {
            "content-type" : "application/json",
        },
        body: JSON.stringify({
            bookTitle,
            stars, 
            input
        })
    }).then((response) => {
        if (response.error){
            console.log(response.error)
        } else {
            console.log(response)
        }
    })
    //window.location.replace(`http://localhost:3000/myratings`)
})