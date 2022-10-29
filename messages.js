function toggle_light_mode(firstLoad) {
    var app = document.getElementsByTagName('BODY')[0];
    const check = firstLoad
      ? localStorage.lightMode != 'dark'
      : localStorage.lightMode == 'dark';
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
    document.getElementById('msgbox').innerText = '✉ ' + txt;
    maggio.classList.add('show');
    setTimeout(function () {
      maggio.classList.remove('show');
    }, 3000);
  }
  document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
      console.log('Flipped!');
      toggle_light_mode({});
    }
  };