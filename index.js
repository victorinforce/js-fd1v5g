// Import stylesheets
import './style.css';

// Write Javascript code!
const appDiv = document.getElementById('app');

$(document).ready(function () {
  $('#example').DataTable({
    processing: true,
    serverSide: true,
    ajax: 'https://raw.githubusercontent.com/victorinforce/js-fd1v5g/main/public/data.json',
    /*columns: [
      { data: 'first_name' },
      { data: 'last_name' },
      { data: 'position' },
      { data: 'office' },
      { data: 'start_date' },
      { data: 'salary' },
    ],*/
    columnDefs: [
      {
        orderable: false,
        className: 'select-checkbox',
        targets: 0,
      },
    ],
    select: {
      style: 'os',
      selector: 'td:first-child',
    },
    order: [[1, 'asc']],
  });
});
