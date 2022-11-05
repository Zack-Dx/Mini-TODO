const pastebinDevKey = "put yours here!";

const formContainer = document.querySelector('#container');
const noteInput = document.getElementById('note');
const deleteAllBtn = document.querySelector('.delete-all');
const searched = document.getElementById('searching');

function getStorageData() {
  const notes = localStorage.getItem('notes');

  return notes !== null ? JSON.parse(notes) : [];
}

function showNotes() {
  const listNotes = getStorageData();
  let html = '';

  listNotes.forEach(function (element, index) {
    html += `
      <div class="box" id="box-${index}" >
        <h5>NOTE :${index + 1}</h5>
        <time>${new Date(1667170744131).toLocaleDateString('en-US')}</time>
        <div class="swappable">
          <p id=myInput-${index} class='myInput'>${element.value}</p> 
        </div>
        <button class=button  onclick=copyText(${index})>Copy</button>
        <button class='button edit' onclick=edit(${index})>Edit</button>
        <button class='button edit' onclick=share(${index})>Share</button>
        <button class=button id=delete onclick=deleted(${index})>Delete note</button>
      </div>
    `;
  });

  const box = document.getElementById('mainbox');
  box.innerHTML = html;
}

function deleted(index) {
  const listNotes = getStorageData();

  listNotes.splice(index, 1);
  localStorage.setItem('notes', JSON.stringify(listNotes));
  showNotes();
  showmsg('Note deleted successfully.');
}
function edit(index) {
  const noteElement = document.getElementById(`box-${index}`);
  const swappableElement = noteElement.getElementsByClassName('swappable')[0];
  const editButton = noteElement.getElementsByClassName('edit')[0];

  if (editButton.innerHTML == 'Edit') {
    swappableElement.innerHTML = `
      <div id="notebox">
        <input type="text" id="note" value="${
          noteElement.getElementsByTagName('p')[0].innerHTML
        }" style="width:${
      noteElement.getElementsByTagName('p')[0].clientWidth + 'px'
    }"/>
      </div>
    `;
    editButton.innerHTML = 'Save';
    showmsgEdit('Note in Edit Mode.');
  } else {
    const listNotes = getStorageData();

    listNotes[index].value = noteElement.getElementsByTagName('input')[0].value;
    localStorage.setItem('notes', JSON.stringify(listNotes));
    showNotes();
    showmsg('Note updated successfully.');
  }
}

function copyText(index) {
  const listNotes = getStorageData();
  const noteToCopy = listNotes[index];
  const text = noteToCopy?.value ?? noteToCopy;

  navigator.clipboard.writeText(text);
  showmsg('Copied the note: ' + text);
}

function share(index) {
  const noteElement = document.getElementById(`box-${index}`);
  const shareableText = noteElement.getElementsByTagName('p')[0].innerHTML;

  console.log('shareableText', shareableText);

  axios.post('https://pastebin.com/api/api_post.php', {
    api_dev_key: pastebinDevKey,
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
  });
}


searched.addEventListener('input', function () {
  const inputValue = searched.value.toLowerCase();
  const noteCard = document.getElementsByClassName('box');

  Array.from(noteCard).forEach((element) => {
    const cardText = element
      .querySelector('.swappable > p')
      .innerText.toLowerCase();

    if (cardText.includes(inputValue)) {
      element.style.display = 'inline-block';
    } else {
      element.style.display = 'none';
    }
  });
});

noteInput.addEventListener('click', function () {
  noteInput.classList.remove('show');
});

formContainer.addEventListener('submit', (event) => {
  event.preventDefault();
  let addNote = document.getElementById('note');
  let listNotes = getStorageData();

  if (addNote.value !== '') {
    listNotes.push({
      id: new Date().getTime(),
      date: new Date().getTime(),
      value: addNote.value,
    });
    showmsg('Your Note has been added successfully.');
    localStorage.setItem('notes', JSON.stringify(listNotes));
  } else {
    showmsgFalse('Please write something for your note before adding it ...');
  }

  noteInput.value = '';
  showNotes();
});

deleteAllBtn.addEventListener('click', () => {
  const notes = localStorage.getItem('notes');
  if (notes === null) {
    showmsgFalse('No notes to delete');
    return;
  }
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete all notes!',
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem('notes');
      showmsg('All notes deleted successfully.');
      document.getElementById('mainbox').innerHTML = '';
    }
  });
});
