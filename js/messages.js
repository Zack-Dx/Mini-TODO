function toggle_light_mode(firstLoad) {
  var app = document.getElementsByTagName('BODY')[0];
  const check = firstLoad
    ? localStorage.lightMode !== 'dark'
    : localStorage.lightMode === 'dark';
  if (check) {
    localStorage.lightMode = 'light';
    app.setAttribute('light-mode', 'light');
    app.setAttribute('button_color', 'dark');
    if (!firstLoad) showmsg('Light Mode Enabled.');
  } else {
    localStorage.lightMode = 'dark';
    app.setAttribute('light-mode', 'dark');
    app.setAttribute('button_color', 'light');
    if (!firstLoad) showmsg('Dark Mode Enabled.');
  }
}

var maggio = document.querySelector('#msgbox');
function showmsg(txt) {
  document.getElementById('msgbox').innerText = '☑ ' + txt;
  maggio.classList.add('show');
  setTimeout(function () {
    maggio.classList.remove('show');
  }, 3000);
}

function msgFalse(txt) {
  document.getElementById('msgbox').innerText = '☒ ' + txt;
  maggio.classList.add('show');
  setTimeout(function () {
    maggio.classList.remove('show');
  }, 3000);
}

function msgEdit(txt) {
  document.getElementById('msgbox').innerText = '✎ ' + txt;
  maggio.classList.add('show');
  setTimeout(function () {
    maggio.classList.remove('show');
  }, 3000);
}

function showmsgFalse (txt) {
  maggio.classList.add('msg--false');
  msgFalse(txt)
  setTimeout(function () {
    maggio.classList.remove('msg--false');
  }, 3000);
}

function showmsgEdit (txt) {
  maggio.classList.add('msg--edit');
  msgEdit(txt)
  setTimeout(function () {
    maggio.classList.remove('msg--edit');
  }, 3000);
}

document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    console.log('Flipped!');
    toggle_light_mode({});
  }
};

//Automaticaly update copyright year

function getCurrentYear() {
  return new Date().getFullYear();
}
document.getElementById('currentYear').innerHTML = getCurrentYear();
