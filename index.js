//Add note

let formContainer = document.querySelector("#container");
let noInput = document.querySelector("#noInputText");
let noteInput = document.getElementById("note");

noteInput.addEventListener("click", function () {
  noInput.classList.remove("show");
});

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





document.body.style="background-color: var(--bs-dark);transition: 0.5s;"
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
      "--bs-dark",
      "linear-gradient(318.32deg, #c3d1e4 0%, #dde7f3 55%, #d4e0ed 100%)"
    );
    texthead.style.setProperty(
        "color","black"
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
        "color","white"
    );
    root.style.setProperty("--bs-dark", "black");
    container.classList.remove("shadow-light");
    setTimeout(() => {
      container.classList.add("shadow-dark");
      themeIcon.classList.remove("change");
    }, 300);
    themeIcon.classList.add("change");
    themeIcon.src = moon;
  }