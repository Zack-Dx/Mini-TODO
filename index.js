//Add note

function putInfoIntoNoteobj(notes){
  if (notes == null) {
    return [];
  } else {
    return JSON.parse(localStorage.getItem('notes'));
  }
}

let formContainer = document.querySelector('#container');
let noInput = document.querySelector('#noInputText');
let noteInput = document.getElementById('note');

noteInput.addEventListener('click', function () {
  noteInput.classList.remove('show');
});

formContainer.addEventListener('submit', (event) => {
  event.preventDefault();
  let noteobj = [];
  let addtxt = document.getElementById('note');
  let notes = localStorage.getItem('notes');

  noteobj = putInfoIntoNoteobj(notes);

  if (addtxt.value != '') {
    noteobj.push(addtxt.value);
    showmsg('Your Note has been added successfully.');
  } else {
    // noInput.classList.add("show");
    showmsg('Please write something for your note before adding it ...');
  }

  localStorage.setItem('notes', JSON.stringify(noteobj));
  noteInput.value = '';

  showNotes();
});

function showNotes() {
  let notesobj = JSON.parse(localStorage.getItem('notes'));

  if (notesobj == null) {
    notesobj = [];
  } else {
    notesobj = JSON.parse(localStorage.getItem('notes'));
  }

  let html = '';
  notesobj.forEach(function (element, index) {
    html += `
      <div class="box" id="box-${index}" >
        <h5>NOTE :${index + 1}</h5>
        <div class="swappable">
          <p id=myInput-${index}>${element}</p> 
        </div>
        <button class=copy  onclick=copyText(${index})>Copy</button>
        <button class=edit onclick=edit(${index})>Edit</button>
        <button id=delete onclick=deleted(${index})>Delete note</button> 
      </div>
    `;
  });

  let box = document.getElementById('mainbox');
  box.innerHTML = html;
}
function deleted(index) {
  let notes = localStorage.getItem('notes');

  noteobj = putInfoIntoNoteobj(notes);

  noteobj.splice(index, 1);
  localStorage.setItem('notes', JSON.stringify(noteobj));
  showNotes();
  showmsg('Note deleted successfully.');
}
function edit(index) {
  // edits the value to the value in text area
  let notes = localStorage.getItem('notes');
  const noteElement = document.getElementById(`box-${index}`);
  const swappableElement = noteElement.getElementsByClassName('swappable')[0];
  const editButton = noteElement.getElementsByClassName('edit')[0];

  if (editButton.innerHTML == 'Edit') {
    swappableElement.innerHTML = `
      <div id="notebox">
        <input type="text" id="note" value="${
          noteElement.getElementsByTagName('p')[0].innerHTML
        }" style="width:${noteElement.getElementsByTagName('p')[0].clientWidth + "px"}"/>
      </div>
    `;
    editButton.innerHTML = 'Save';
    showmsg('Note in Edit Mode.');
  } else {

    noteobj = putInfoIntoNoteobj(notes);
    
    noteobj[index] = noteElement.getElementsByTagName('input')[0].value;
    localStorage.setItem('notes', JSON.stringify(noteobj));
    showNotes();
    showmsg('Note updated successfully.');
  }
}

function copyText(index) {
  let noteobj = JSON.parse(localStorage.getItem('notes'));
  let noteToCopy = noteobj[index];
  navigator.clipboard.writeText(noteToCopy);
  showmsg("Copied the note: " + noteToCopy);
}


let searchtext = document.getElementById('searching');
searchtext.addEventListener("input", function(){
   let inputvalue = searchtext.value.toLowerCase();
   let notecard = document.getElementsByClassName('box');
   Array.from(notecard).forEach(function(element){
    let cardtext = element.getElementsByTagName('div')[0].getElementsByTagName("p")[0].innerText.toLowerCase();
    if (cardtext.includes(inputvalue)) {
      element.style.display = "inline-block";
    }  
    else{
      element.style.display = "none";
    }
   })
 })