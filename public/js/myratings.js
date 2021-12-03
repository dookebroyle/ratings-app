
const deleteButtons = document.querySelectorAll('#delete-buttons')
const successMessage = document.querySelector('#message')


// listen for click on all of the delete buttons and fire off ratings/delete route
deleteButtons.forEach( (button) => {
    button.addEventListener('click', function (e)  {
        let bookTitle = document.querySelector('input[value=Delete]').name


        
        fetch(`http://localhost:3000/ratings/delete?bookTitle=${bookTitle}`, {
            method: "DELETE",
            redirect: 'follow',
        }).then((response) => {
            if (response.error){
                console.log(response.error)
            } else {
                successMessage.innerHTML = 'Review deleted!'
                setTimeout( () => {
                    location.reload(true)
                }, 2000)
            }
            
            
        })
    })
})

