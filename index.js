// Import stylesheets
import './style.css';

// Write Javascript code!
const appDiv = document.getElementById('app');

/* Formatting function for row details - modify as you need */
function format(d) {
  // `d` is the original data object for the row
  return (
    '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">' +
    '<tr>' +
    '<td>First name:</td>' +
    '<td>' +
    d.first_name +
    '</td>' +
    '</tr>' +
    '<tr>' +
    '<td>Last name:</td>' +
    '<td>' +
    d.last_name +
    '</td>' +
    '</tr>' +
    '<tr>' +
    '<td>Extra info:</td>' +
    '<td>And any further details here (images etc)...</td>' +
    '</tr>' +
    '</table>'
  );
}

$(document).ready(function () {
  var table = $('#example').DataTable({
    language: {
      url: '//cdn.datatables.net/plug-ins/1.13.3/i18n/pt-BR.json',
    },
    lengthMenu: [
      [100, 500, 1000, -1],
      [100, 500, 1000, 'Tudo'],
    ],
    processing: true,
    // serverSide: true,
    ajax: 'https://raw.githubusercontent.com/victorinforce/js-fd1v5g/main/public/data-v1.json',
    columns: [
      {
        className: 'dt-control',
        orderable: false,
        data: null,
        defaultContent: '',
      },
      {
        // title: () => '<input type="checkbox" />',
        render: () => '',
        orderable: false,
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
        targets: [1],
      },
    ],
    select: {
      style: 'os',
      selector: 'td.select-checkbox', // td:first-child
    },
    order: [[2, 'asc']],
    initComplete: function (settings, json) {
      $('#example thead th.select-checkbox').html(
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

  // Add event listener for opening and closing details
  $('#example tbody').on('click', 'td.dt-control', function () {
    var tr = $(this).closest('tr');
    var row = table.row(tr);

    if (row.child.isShown()) {
      // This row is already open - close it
      row.child.hide();
      tr.removeClass('shown');
    } else {
      // Open this row
      row.child(format(row.data())).show();
      tr.addClass('shown');
    }
  });
});
