const loginSubmit = document.querySelector('#login-submit')
const signupSubmit = document.querySelector('#signup-submit')

//check credetials for login
loginSubmit.addEventListener('submit', (e) => {
    const username =this.elements.username.value
    const password = this.elements.password.value
    //send password using SSL only
    fetch(`http://localhost:3000/users/login?username=${username}&password=${password}`).then((response) => {
        response.json( (data) => {
            if (response.error){
                console.log(response.error)
            } else {
                response.send({
                    username
                })
            }
        })
    })
})

// sign up a new user
signupSubmit.addEventListener('submit', function(e) {
    const username =this.elements.username.value
    const password = this.elements.password.value
    //send password using SSL only
    fetch(`http://localhost:3000/users/signup?username=${username}&password=${password}`).then((response) => {
        response.json( (data) => {
            if (response.error){
                console.log(response.error)
            } else {
                response.send({
                    username
                })
            }
        })
    })
})






