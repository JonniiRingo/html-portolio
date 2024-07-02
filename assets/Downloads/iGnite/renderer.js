const { ipcRenderer } = require('electron');

document.getElementById('sdk-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const sdks = formData.getAll('sdk');
  ipcRenderer.send('install-sdks', sdks);
});
