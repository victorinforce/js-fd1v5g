// Import stylesheets
import './style.css';

// Write Javascript code!
const appDiv = document.getElementById('app');
// appDiv.innerHTML = `<h1>JS Starter</h1>`;

$(document).ready(function () {
  $('#example').DataTable({
    processing: true,
    serverSide: true,
    ajax: './public/data.json',
  });
});
