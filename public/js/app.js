//this form needs to send username and password in query string from Header.HBS
//how?



const signout = document.querySelectorAll(".sign-out-form")

signout.forEach( function (form) {
    form.addEventListener('submit', function (e) {
        console.log('logout button clicked')
        fetch(`http://localhost:3000/users/logout?`).then((response) => {
            response.json( (data) => {
                if (response.error){
                    console.log(response.error)
                } else {
                    console.log(response)
                    window.location.replace(`http://localhost:3000/`)
                }                
            })
        })  
        
    })
})