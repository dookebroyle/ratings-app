
const deleteButtons = document.querySelectorAll('#delete-buttons')
const successMessage = document.querySelector('#message')
const domain = 'https://doyle-book-ratings-app.herokuapp.com'


// listen for click on all of the delete buttons and fire off ratings/delete route
deleteButtons.forEach( (button) => {
    button.addEventListener('click', function (e)  {
        let bookTitle = document.querySelector('input[value=Delete]').name
        fetch(`${domain}/ratings/delete?bookTitle=${bookTitle}`, {
            method: "DELETE",
            redirect: 'follow',
        }).then((response) => {
            console.log('reached')
            if (response.error){
                console.log("error")
                console.log(response.error)
            } else {
                console.log('no error')
                successMessage.innerHTML = 'Review deleted!'
                setTimeout( () => {
                    location.reload(true)
                }, 1000)
            } 
        })
    })
})

