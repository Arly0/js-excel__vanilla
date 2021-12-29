import { setLastTable } from './services/routeService.js';
// catch event redirect on another page
const element = document.querySelector('.tables-list');

element.addEventListener('click', function(event) {
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