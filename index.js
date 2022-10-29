//Add note

let formContainer = document.querySelector('#container');
let noInput = document.querySelector('#noInputText');
let noteInput = document.getElementById('note');

noteInput.addEventListener('click', function () {
  noteInput.classList.remove('show');
});
// (function () {
//   isDarkMode = !(localStorage.getItem("isDarkMode") === "true");
//   toggleDarkMode();
// })();
// function toggleDarkMode() {
//   isDarkMode = !isDarkMode;
//   localStorage.setItem("isDarkMode", isDarkMode);

//   if (isDarkMode) {
//     document.body.className = "dark-mode";
//     document.getElementById("toggleDarkModeBtn").innerText = "Light mode";
//   } else {
//     document.body.className = "light-mode";
//     document.getElementById("toggleDarkModeBtn").innerText = "Dark mode";
//   }
// }

formContainer.addEventListener('submit', (event) => {
  event.preventDefault();
  let noteobj = [];
  let addtxt = document.getElementById('note');
  let notes = localStorage.getItem('notes');

  if (notes == null) {
    noteobj = [];
  } else {
    noteobj = JSON.parse(localStorage.getItem('notes'));
  }

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
          <p>${element}</p>
        </div>
        <button id=delete onclick=deleted(${index})>Delete note</button>
        <button class=edit onclick=edit(${index})>Edit</button>
        <button class=edit onclick=copyText(${index})>Copy</button>
      </div>
    `;
  });

  let box = document.getElementById('mainbox');
  box.innerHTML = html;
}

function deleted(index) {
  let notes = localStorage.getItem('notes');

  if (notes == null) {
    noteobj = [];
  } else {
    noteobj = JSON.parse(localStorage.getItem('notes'));
  }
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
    if (notes == null) {
      noteobj = [];
    } else {
      noteobj = JSON.parse(localStorage.getItem('notes'));
    }
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
   console.log(inputvalue);
   let notecard = document.getElementsByClassName('box');
   Array.from(notecard).forEach(function(element){
    let cardtext = element.getElementsByTagName("p")[0].innerText;
    if (cardtext.includes(inputvalue)) {
      element.style.display = "block";
      
    }  
    else{
      element.style.display = "none";
    }
    
   })
 })
