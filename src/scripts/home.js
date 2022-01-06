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
  const firstItem = tableData.data.split(',')[0];
  const item = document.createElement("div");
  const linkToTable = document.createElement("a");
  const dateCreation = new Date(tableData.date);
  item.setAttribute("data-id", tableData.id);
  item.setAttribute("data-name", tableData.name);
  linkToTable.href = "table.html";
  linkToTable.setAttribute("data-id", tableData.id);
  if (firstItem) {
    linkToTable.setAttribute("title", firstItem);
  }
  linkToTable.classList.add("link-to-table");
  linkToTable.innerHTML = `
      <div data-id="${tableData.id}" class="table-name">${tableData.name}</div>
      <div data-id="${tableData.id}" class="table-date-creation">
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
  // button.textContent = "X";
  button.innerHTML = "<img src='./src/img/close.png' class='close__btn_img' />";

  button.addEventListener("click", (Event) => {
    const elementToRemove = Event.target.closest(".table-list-item");
    const idOfTable = elementToRemove.getAttribute('data-id');
    localStorage.removeItem(`[${idOfTable}]table-${elementToRemove.querySelector(".table-name").textContent}`);
    console.log(`[${idOfTable}]table-${elementToRemove.querySelector(".table-name").textContent}`);
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
    if (keys[i].includes('table-')) {
      tableList.push(JSON.parse(localStorage.getItem(keys[i])));
    }
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
