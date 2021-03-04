//Calling show notes for reading  each time after refreshing the page the and the value will be displayed
showNotes();
//If  Users adds a Notes to a local storage
let addBtn = document.getElementById('addBtn');
let addTitle = document.getElementById('addTitle');
//Adding click Event Listeners to Add Button and Calling Event Function
addBtn.addEventListener('click', function (e) {
    //Storing The text value in the addTxt
    let addTxt = document.getElementById("addTxt");
    //Storing The data in the notes variable
    let notes = localStorage.getItem("notes");
    //If no string will find then create an empty array
    if (notes == null) {
        notesObj = [];
    }
    //Parsing the data into json format
    else {
        notesObj = JSON.parse(notes);
    }
    //Pushin Add Notes value in the array
    let myObj = {
        title: addTitle.value,
        text: addTxt.value
    }
    notesObj.push(myObj);
    //Updating the localStorage's value after pushing the data in the array
    localStorage.setItem("notes", JSON.stringify(notesObj));
    //For Making the add Text area blank after insering the notes
    addTxt.value = "";
    addTitle.value = "";
    //calling the show function
    showNotes();
});

//To Show Notes from localStorage
function showNotes() {
    //Again stores the data in the localStorage
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    //makeing html empty string for iterating the notes data dynamically.
    let html = "";
    //Populating the array data in the card
    notesObj.forEach(function (element, index) {
        html += `
         <div class="noteCard my-2 mx-2 card" style="width: 18rem;"> 
            <div class="card-body">
              <h5 class="card-title">${element.title}</h5>
              <p class="card-text">${element.text}</p>
              <button id=${index} onclick="deleteNote(this.id)" class="btn btn-primary">Delete</button>
            </div>
         </div>
`;
    });
    //for populating the stored data from the array
    let notesEle = document.getElementById('notes');
    //Making easy way 
    if (notesObj.length != 0) {
        notesEle.innerHTML = html;
    } else {
        //if no data in the array then showing this message
        notesEle.innerHTML = `Nothing to show! Use "Add a note" Section above to add notes.`;
    }
}

//To Delet Notes
function deleteNote(index) {
    //Again Getting the data from localStorage
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    //Deleting The  current index array
    notesObj.splice(index, 1);
    //After removing array again set the localStorage
    localStorage.setItem("notes", JSON.stringify(notesObj));
    //After deleting calling the showNotes method
    showNotes();
}
//Search Filter
//Storing the value into the search variable
let search = document.getElementById('searchTxt');
//Adding the Input EventListener
search.addEventListener("input", function () {
    //Storing the search term into the inputVal variable and Using Lowercase function if user input any UpperCase 
    let inputVal = search.value.toLowerCase();
    //Searching noteCard className and populating thorugh array function
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function (element) {
        //Getting the content of the stored card and storing in the cardTxt variable
        let cardTxt = element.getElementsByTagName("h5")[0].innerText;
        //Showing the including text present in the card
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    })
})
