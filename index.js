//Add note

let formContainer = document.querySelector("#container");
let noInput = document.querySelector("#noInputText");
let noteInput = document.getElementById("note");

noteInput.addEventListener("click", function () {
    noInput.classList.remove("show");
});
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
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(localStorage.getItem("notes"));
    }

    let html = "";
    notesobj.forEach(function (element, index) {
        html += `<div id="box" >
    <h5>NOTE :${index + 1}</h5>
    <p>${element.toUpperCase()}</p>
    <button id=delete onclick=deleted(${index})>Delete note</button>
    <button id=edit onclick=edit(${index})>Edit</button>
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
    }
    else {
        noteobj = JSON.parse(localStorage.getItem("notes"));
    }
    noteobj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(noteobj));
    showNotes();

}





document.body.style = "background-color: var(--bs-dark);transition: 0.5s;"
const sun = "https://www.uplooder.net/img/image/55/7aa9993fc291bc170abea048589896cf/sun.svg";
const moon = "https://www.uplooder.net/img/image/2/addf703a24a12d030968858e0879b11e/moon.svg"

var theme = "dark";
const root = document.querySelector(":root");
const container = document.getElementsByClassName("theme-container")[0];
const themeIcon = document.getElementById("theme-icon");
const texthead = document.getElementById("text");
container.addEventListener("click", setTheme);
function setTheme() {
    switch (theme) {
        case "dark":
            setLight();
            theme = "light";
            break;
        case "light":
            setDark();
            theme = "dark";
            break;
    }
}
function setLight() {
    root.style.setProperty(
        "--bs-dark", "rgb(111, 143, 175)"
        //   "linear-gradient(318.32deg, #7e6ce4 0%, #8f84c9 55%, #8f84c9 100%)"
    );
    texthead.style.setProperty(
        "color", "rgb(74, 99, 124)"
    );
    container.classList.remove("shadow-dark");
    setTimeout(() => {
        container.classList.add("shadow-light");
        themeIcon.classList.remove("change");
    }, 300);
    themeIcon.classList.add("change");
    themeIcon.src = sun;
}
function setDark() {
    texthead.style.setProperty(
        "color", "#DDA0DD"
    );
    root.style.setProperty(
        "--bs-dark", "rgb(216,191,216,0.5)"
    );
    container.classList.remove("shadow-light");
    setTimeout(() => {
        container.classList.add("shadow-dark");
        themeIcon.classList.remove("change");
    }, 300);
    themeIcon.classList.add("change");
    themeIcon.src = moon;
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
    noteobj[index] = document.getElementById("note").value;
    localStorage.setItem("notes", JSON.stringify(noteobj));
    showNotes();

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