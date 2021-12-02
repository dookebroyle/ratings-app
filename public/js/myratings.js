
const deleteButtons = document.querySelectorAll('#delete-buttons')
const successMessage = document.querySelector('#message')


// listen for click on all of the delete buttons and fire off ratings/delete route
deleteButtons.forEach( (button) => {
    button.addEventListener('click', function (e)  {
        e.preventDefault();
        console.log('button clicked')
        let bookTitle = document.querySelector('input[value=Delete]').name
        fetch(`http://localhost:3000/ratings/delete`, {
            method: "DELETE",
            redirect: 'follow',
            body: JSON.stringify({
                bookTitle
            })
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

