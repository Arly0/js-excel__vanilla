import { getLastTable } from './services/routeService.js'

document.addEventListener("DOMContentLoaded", () => {
  const tableData = getLastTable();
  if (tableData === false) {
    alert('Not set last table');
    return;
  }
  document.querySelector('.fileinfo__name').value = tableData.name;
});