import { setLastTable } from './services/routeService.js';
// catch event redirect on another page
const mainTableListElement = document.querySelector('.tables-list');

mainTableListElement.addEventListener('click', function(event) {
  // event.preventDefault();
  if (event.target.getAttribute('data-id')) {
    // set this id to ls
    const tableName = event.target.closest('.table-list-item').getAttribute('data-name'),
    tableId = event.target.getAttribute('data-id');

    const item = JSON.parse(localStorage.getItem(`[${tableId}]table-${tableName}`));
    if (item) {
      setLastTable(item);
    } else {
      alert ('Error. Cannot find this table.')
    }
  }
});

const tableCell = document.querySelector('.table');
if (tableCell) {
  tableCell.addEventListener('click', function (event) {
    const cells = document.getElementsByClassName('cell');
    for (const cell of cells) {
      cell.classList.remove('active');
    }
    const targetValue = event.target.innerText;
    document.querySelector('.textedfit__field').value = targetValue;
    event.target.classList.add('active');
  });
}