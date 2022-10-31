//Add note

let formContainer = document.querySelector("#container");
let noInput = document.querySelector("#noInputText");
let noteInput = document.getElementById("note");

noteInput.addEventListener("click", function () {
  noteInput.classList.remove("show");
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
    showmsg('Your Note has been added successfully.')
  } 
  else {
    // noInput.classList.add("show");
    showmsg('Please write something for your note before adding it ...')
  }

  localStorage.setItem("notes", JSON.stringify(noteobj));
  noteInput.value = ""

  showNotes();

});

function showNotes() {
  let notesobj = JSON.parse(localStorage.getItem("notes"));

  if (notesobj == null) {
    notesobj = [];
  } 
  else {
    notesobj = JSON.parse(localStorage.getItem("notes"));
  }

  let html = "";
  notesobj.forEach(function (element, index) {
    html += `
      <div class="box" id="box-${index}" >
        <h5>NOTE :${index + 1}</h5>
        <div class="swappable">
          <p>${element.toUpperCase()}</p>
        </div>
        <button id=delete onclick=deleted(${index})>Delete note</button>
        <button class=edit onclick=edit(${index})>Edit</button>
        <button class="edit" onclick=share(${index})>Share</button>
      </div>
    `;
  });

  let box = document.getElementById("mainbox");
  box.innerHTML = html;

}

function deleted(index) {
  
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
  showmsg('Note deleted successfully.')
  
}

function edit(index) {
  // edits the value to the value in text area
  let notes = localStorage.getItem("notes");
  const noteElement = document.getElementById(`box-${index}`);
  const swappableElement = noteElement.getElementsByClassName('swappable')[0];
  const editButton = noteElement.getElementsByClassName('edit')[0];

  if (editButton.innerHTML == 'Edit') {
    swappableElement.innerHTML = `
      <div id="notebox">
        <input type="text" id="note" value="${noteElement.getElementsByTagName('p')[0].innerHTML}" />
      </div>
    `
    editButton.innerHTML = 'Save';
    showmsg('Note in Edit Mode.')
  } else {
    if (notes == null) {
      noteobj = [];
    } else {
      noteobj = JSON.parse(localStorage.getItem("notes"));
    }
    noteobj[index]=noteElement.getElementsByTagName("input")[0].value;
    localStorage.setItem("notes", JSON.stringify(noteobj));
    showNotes();
    showmsg('Note updated successfully.')
  }
}

function share(index) {
  const noteElement = document.getElementById(`box-${index}`);
  const shareableText = noteElement.getElementsByTagName('p')[0].innerHTML;

  console.log('shareableText', shareableText);

  axios.post('https://pastebin.com/api/api_post.php', {
    api_dev_key: 'f0296bbb59f75c86846cc8f4399fae18',
    api_paste_code: shareableText,
    api_option: 'paste',
    api_paste_expire_date: '10M',
    api_paste_name: 'Mini-TODO by Zack-Dx'
  }, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      Referer: "http://pastebin.com"
    }
  }).then(function (response) {
    navigator.clipboard.writeText(response.data).then(
      () => {
        showmsg('Note URL copied to clipboard!');
      }, (error) => {
        showmsg('Aw, that snapped. :( Please try again.');
        console.log(error);
      }
    );    
  }).catch(function (error) {
    showmsg('Aw, that snapped. :( Please try again.');
    console.log(error);
  });
};
