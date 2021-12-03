const submit = document.querySelector('#booklist-form')
const selectBox = document.querySelector('#select-box')


//update the select list element on change
selectBox.addEventListener('onchange', (e)=> {
    selectedList = document.querySelector('#select-box option:checked').value
})

//fire off fetchbooks route once booklist is chosen and submitted
submit.addEventListener('submit', (e) => {
    e.preventDefault();
    let selectedList = document.querySelector('#select-box option:checked').value
    
    listName = selectedList.replace(/\s/g, '-');
    fetch(`http://localhost:3000/fetchbooks?booklistName=${listName}`).then((response) => {
        if (response.error){
            console.log(response.error)
        }})
        window.location.replace(`http://localhost:3000/fetchbooks?booklistName=${listName}`)
        selectedList = "";
        listName = "";
    })