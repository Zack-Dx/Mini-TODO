//Add note

let formContainer = document.querySelector("#container");
let noInput = document.querySelector("#noInputText");
let noteInput = document.getElementById("note");

noteInput.addEventListener("click", function () {
  noInput.classList.remove("show");
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

formContainer.addEventListener("submit", event => {
  event.preventDefault()
  let noteobj = [];
  let addtxt = document.getElementById("note");
  let notes = localStorage.getItem("notes");

  if (notes == null) {
    noteobj = []
  }
   else {
    noteobj = JSON.parse(localStorage.getItem("notes"));
  }

  if (addtxt.value != "") {
    noteobj.push(addtxt.value);
  } 
  else {
    noInput.classList.add("show");
  }

  localStorage.setItem("notes", JSON.stringify(noteobj));
  noteInput.value = ""

  showNotes();

});

function showNotes() {
  let notesobj = JSON.parse(localStorage.getItem("notes"));
  console.log(notesobj);

  if (notesobj == null) {
  } 
  else {
    notesobj = JSON.parse(localStorage.getItem("notes"));
  }

  let html = "";
  notesobj.forEach(function (element, index) {
    html += `<div id="box" >
    <h5>NOTE :${index + 1}</h5>
    <p class="p${index}">${element.toUpperCase()}</p>
    <input type="text" class="hidden" placeholder="Edit note:" id="boxInput${index}" value="${element}">
    <button 
    <button id=delete onclick=deleted(${index})>Delete note</button>
    <button id=edit onclick=edit(${index})>Edit</button>
        </div>`;
  });

  let box = document.getElementById("mainbox");
  box.innerHTML = html;

}

function deleted(index) {
  let notes = localStorage.getItem("notes");

  if (notes == null) {
    // noteobj = [];
  } 
  else {
    noteobj = JSON.parse(localStorage.getItem("notes"));
  }
  noteobj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(noteobj));
  showNotes();
  
}
function edit(index) {
  // edits the value to the value in text area
  let notes = localStorage.getItem("notes");
  let inputs = document.getElementById(`boxInput${index}`)
  if (notes == null) {
  } else {
    noteobj = JSON.parse(localStorage.getItem("notes"));
  }
  inputs.classList.toggle('hidden')
  localStorage.setItem("notes", JSON.stringify(noteobj));
  if(inputs.classList !== 'hidden'){
    document.querySelector(`.p${index}`).innerText = inputs.value.toUpperCase()
  }else{
    inputs.classList.toggle('hidden')
  }
}