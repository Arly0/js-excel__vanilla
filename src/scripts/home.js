import {
  newTableInput,
  addTableButton,
  tableListOutput,
  tableList
} from "./init.js";
import { 
  createTableData, 
  saveTableToLocalStorage
 } from './services/tableService.js';

const createTableItem = (tableData) => {
  const item = document.createElement("div");
  const linkToTable = document.createElement("a");
  const dateCreation = new Date(tableData.date);
  linkToTable.href = "table.html";
  linkToTable.classList.add("link-to-table");
  linkToTable.innerHTML = `
      <div class="table-name">${tableData.name}</div>
      <div class="table-date-creation">
        ${dateCreation.toDateString()}
        ${dateCreation.getHours()}:
        ${dateCreation.getMinutes()}:
        ${dateCreation.getSeconds()} 
      </div>
      `;
  item.prepend(linkToTable);
  item.append(createCloseButton());
  item.classList.add("table-list-item");
  return item;
};

const createCloseButton = () => {
  const button = document.createElement("button");
  button.classList.add("close-button");
  button.textContent = "X";

  button.addEventListener("click", (Event) => {
    const elementToRemove = Event.target.closest(".table-list-item");
    localStorage.removeItem(`table-${elementToRemove.querySelector(".table-name").textContent}`);
    console.log(`table-${elementToRemove.querySelector(".table-name").textContent}`);
    Event.target.closest(".table-list-item").remove();
  });

  return button;
};

// get all exist tables from ls
document.addEventListener("DOMContentLoaded", () => {
  let keys = Object.keys(localStorage),
  i = keys.length;
  if (i == 0) {
    return; // end event, localstorage is empty
  }
  while (i--) {
    tableList.push(JSON.parse(localStorage.getItem(keys[i])));
  }

  if (tableList.length > 0) {
    tableList.map((item) => {
      tableListOutput.prepend(createTableItem(item));
    });
  }
});


addTableButton.addEventListener("click", (Event) => {
  const name = newTableInput.value;
  // create table data
  const tableData = createTableData(name);
  if (tableData === false) {
    return false;
  }
  // create layout for new table
  tableListOutput.prepend(createTableItem(tableData));
  // save table to ls
  saveTableToLocalStorage(tableData)
});
