const submit = document.querySelector('#booklist-form')
const selectBox = document.querySelector('#select-box')
const domain = 'https://doyle-book-ratings-app.herokuapp.com'


//update the select list element on change
selectBox.addEventListener('onchange', (e)=> {
    selectedList = document.querySelector('#select-box option:checked').value
})

//fire off fetchbooks route once booklist is chosen and submitted
submit.addEventListener('submit', (e) => {
    e.preventDefault();
    let selectedList = document.querySelector('#select-box option:checked').value
    
    listName = selectedList.replace(/\s/g, '-');
    fetch(`${domain}/fetchbooks?booklistName=${listName}`).then((response) => {
        if (response.error){
            console.log(response.error)
        }})
        window.location.replace(`${domain}/fetchbooks?booklistName=${listName}`)
        selectedList = "";
        listName = "";
    })