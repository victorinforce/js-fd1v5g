// Import stylesheets
import './style.css';

// Write Javascript code!
const appDiv = document.getElementById('app');

$(document).ready(function () {
  var table = $('#example').DataTable({
    processing: true,
    serverSide: true,
    ajax: 'https://raw.githubusercontent.com/victorinforce/js-fd1v5g/main/public/data.json?2',
    columns: [
      {
        // title: () => '<input type="checkbox" />',
        render: () => '',
        orderable: false,
        width: 20,
      },
      { data: 'first_name', title: 'Nome' },
      { data: 'last_name', title: 'Sobrenome' },
      { data: 'position', title: 'Posição' },
      { data: 'office', title: 'Office' },
      { data: 'start_date', title: 'Data' },
      { data: 'salary', title: 'Salário' },
    ],
    columnDefs: [
      {
        orderable: false,
        className: 'select-checkbox',
        targets: [0],
      },
    ],
    select: {
      style: 'os',
      selector: 'td:first-child',
    },
    order: [[1, 'asc']],
    initComplete: function (settings, json) {
      $('#example thead th:first-child').html(
        '<input type="checkbox" class=selectAll />'
      );

      $('.selectAll').click(() => {
        if ($('.selectAll').is(':checked')) {
          table.rows().select();
        } else {
          table.rows().deselect();
        }
      });
    },
  });

  $('.obter').click(() => {
    var selecionados = $('.selecionados');
    selecionados.html('');

    var rows = table.rows({ selected: true });

    console.log('rows', JSON.stringify(rows));
    var data = rows.data();
    debugger;
    for (var i = 0; i < rows.count(); i++) {
      console.log(i);
      selecionados.append(JSON.stringify(data[i], null, '\t'));
    }
  });
});
