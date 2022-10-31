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
        <div class="box__header">
          <time>${new Date(1667170744131).toLocaleDateString('en-US')}</time>
          <div class='box__controller'>
            <button class='button button_mini'  onclick=copyText(${index})>
              <i class="icofont-ui-copy"></i>
            </button>
            <button class='button button_mini edit' onclick=edit(${index})>
              <i class="icofont-ui-edit"></i>
            </button>
            <button class='button button_mini button-danger' id=delete onclick=deleted(${index})>
              <i class="icofont-ui-delete"></i>
            </button> 
          </div>
        </div>
        <hr />    
        <div class="box__content" >
          <div class='checkbox__container'>
          <input ${
            element.status ? 'checked' : ''
          } onclick=changeStatus(${index}) type="checkbox" class="_checkbox" id="_checkbox-${index}">
          <label for="_checkbox-${index}">
            <div class="tick_mark"></div>
          </label>
          </div>
          <div class="swappable box__input">
            <p id=myInput-${index} class='myInput'>${element.value}</p> 
          </div>
        </div>
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
  const editButton = document.querySelector(`#box-${index} .edit`);
  const noteText = document.querySelector(`#box-${index} .swappable p`);

  if (editButton.classList.contains('active')) {
    const listNotes = getStorageData();

    listNotes[index].value = noteText.innerHTML;
    localStorage.setItem('notes', JSON.stringify(listNotes));
    showNotes();
    showmsg('Note updated successfully.');
  } else {
    noteText.setAttribute('contenteditable', 'true');
    noteText.focus();
    editButton.classList.add('active');
    editButton.innerHTML = 'Save';
    showmsg('Note in Edit Mode.');
  }
}

function copyText(index) {
  const listNotes = getStorageData();
  const noteToCopy = listNotes[index];
  const text = noteToCopy?.value ?? noteToCopy;

  navigator.clipboard.writeText(text);
  showmsg('Copied the note: ' + text);
}

function changeStatus(index) {
  const listNotes = getStorageData();
  const newList = listNotes.map((element, elementIndex) => {
    if (elementIndex === index) {
      element.status = !element.status;
    }
    return element;
  });

  localStorage.setItem('notes', JSON.stringify(newList));
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
      status: false,
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
