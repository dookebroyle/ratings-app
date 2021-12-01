//added functionality to pick from a list of NY Times Bestseller Book Lists ---- not finished
const submit = document.querySelector('#booklist-form')
const selectBox = document.querySelector('#select-box')
selectBox.addEventListener('onchange', (e)=> {
    console.log('value changed of selectlist')
    selectedList = document.querySelector('#select-box option:checked').value
})
submit.addEventListener('submit', (e) => {
    e.preventDefault();
    let selectedList = document.querySelector('#select-box option:checked').value
    console.log(selectedList)
    listName = selectedList.replace(/\s/g, '-');
    fetch(`http://localhost:3000/fetchbooks?booklistName=${listName}`).then((response) => {
        if (response.error){
            console.log(response.error)
        } else {
            console.log(response)
        }
        })
        window.location.replace(`http://localhost:3000/fetchbooks?booklistName=${listName}`)
        selectedList = "";
        listName = "";
    })