const updateForm = document.querySelector('#update-form')
const successText = document.querySelector('#success-text')

//listen for post click on Review Update form and fire off ratings/postupdate
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
        redirect: 'follow',
        body: JSON.stringify({
            bookTitle,
            stars, 
            input
        })
    }).then((response) => {
        if (response.error){
            console.log(response.error)
        } else {
            successText.innerHTML = 'Review Updated!!'
        }
    })
})



