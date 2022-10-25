//Add note

let add = document.querySelector("#add");
let isDarkMode = false;

// on page load
(function () {
  isDarkMode = !(localStorage.getItem("isDarkMode") === "true");
  toggleDarkMode();
})();
function toggleDarkMode() {
  isDarkMode = !isDarkMode;
  localStorage.setItem("isDarkMode", isDarkMode);

  if (isDarkMode) {
    document.body.className = "dark-mode";
    document.getElementById("toggleDarkModeBtn").innerText = "Light mode";
  } else {
    document.body.className = "light-mode";
    document.getElementById("toggleDarkModeBtn").innerText = "Dark mode";
  }
}

add.addEventListener("click", () => {
  let noteobj = [];
  let addtxt = document.getElementById("note");
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    noteobj = [];
  } else {
    noteobj = JSON.parse(localStorage.getItem("notes"));
  }
  if (addtxt.value != "") {
    noteobj.push(addtxt.value);
  }
  console.log(noteobj);

  localStorage.setItem("notes", JSON.stringify(noteobj));

  showNotes();
});

function showNotes() {
  let notesobj = JSON.parse(localStorage.getItem("notes"));
  console.log(notesobj);
  if (notesobj == null) {
    notesobj = [];
  } else {
    notesobj = JSON.parse(localStorage.getItem("notes"));
  }
  let html = "";
  notesobj.forEach(function (element, index) {
    html += `<div id="box" >
    <h5>NOTE :${index + 1}</h5>
    <p>${element}</p>
    <button id=delete onclick=deleted(${index})>Delete note</button>
    <button id=edit onclick=edit(${index})>edit</button>
        </div>`;
  });
  let box = document.getElementById("mainbox");
  box.innerHTML = html;
}

function deleted(index) {
  console.log("Deletion of " + index + " success");
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    noteobj = [];
  } else {
    noteobj = JSON.parse(localStorage.getItem("notes"));
  }
  noteobj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(noteobj));
  showNotes();
}
function edit(index) {
  // edits the value to the value in text area
  console.log("edit of " + index + " success");
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    noteobj = [];
  } else {
    noteobj = JSON.parse(localStorage.getItem("notes"));
  }
  noteobj[index]=document.getElementById("note").value;
  localStorage.setItem("notes", JSON.stringify(noteobj));
  showNotes();
}
