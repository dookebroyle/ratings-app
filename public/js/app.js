const signout = document.querySelectorAll(".sign-out-button")

signout.forEach( (link) => {
    link.addEventListener('click', (e) => {
        fetch(`http://localhost:3000/users/signup?username=${username}&password=${password}`)
    })
})