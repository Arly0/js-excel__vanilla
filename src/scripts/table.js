import { getLastTable, setLastTable } from './services/routeService.js';
import { editLine, tableSize } from './init.js';
import { generateTableLayout } from './services/layoutService.js';
import { saveTableToLocalStorage } from './services/tableService.js';

document.addEventListener("DOMContentLoaded", () => {
  const tableData = getLastTable();
  if (tableData === false) {
    alert('Not set last table');
    window.location = '/index.html';
    return;
  }
  document.querySelector('.fileinfo__name').value = tableData.name;

  generateTableLayout(tableData);
});

const addition = (x, y) => {
  return x+y;
}

const subtraction = (x, y) => {
  return x-y;
}

const multiply = (x, y) => {
  return x*y;
}

const division = (x, y) => {
  if (y === 0) {
    return false;
  }
  return x/y;
}

// set event onclick

window.saveLine = () => {
  if (!document.querySelector('.cell.active')) {
    alert('Select cell');
    return 0;
  }
  let value = editLine.value;
  if (value.indexOf('=') === 0) {
    value = value.split('=')[1];
    let values = [], result = null;
    // use formula
    if (value.includes('+')) {
      // +
      values = value.split('+');
      result = addition(parseFloat(values[0]), parseFloat(values[1]));
    } else if(value.includes('-')) {
      // -
      values = value.split('-');
      result = subtraction(parseFloat(values[0]), parseFloat(values[1]));
    } else if (value.includes('*')) {
      // *
      values = value.split('*');
      result = multiply(parseFloat(values[0]), parseFloat(values[1]));
    } else if (value.includes('/')) {
      // /
      values = value.split('/');
      result = division(parseFloat(values[0]), parseFloat(values[1]));
    }
    if (result !== null) {
      value = result.toFixed(2);
    }
  }
  document.querySelector('.cell.active').innerHTML = value;
}

window.setBold = () => {
  if (!document.querySelector('.cell.active')) {
    alert('Select cell');
    return 0;
  }
  document.querySelector('.cell.active').classList.toggle('bold');
}

window.setItalic = () => {
  if (!document.querySelector('.cell.active')) {
    alert('Select cell');
    return 0;
  }
  document.querySelector('.cell.active').classList.toggle('italic');
}

window.setLeftAlign = () => {
  if (!document.querySelector('.cell.active')) {
    alert('Select cell');
    return 0;
  }
  document.querySelector('.cell.active').classList.remove('align-right');
  document.querySelector('.cell.active').classList.remove('align-center');
  document.querySelector('.cell.active').classList.toggle('align-left');
}

window.setCenterAlign = () => {
  if (!document.querySelector('.cell.active')) {
    alert('Select cell');
    return 0;
  }
  document.querySelector('.cell.active').classList.remove('align-right');
  document.querySelector('.cell.active').classList.remove('align-left');
  document.querySelector('.cell.active').classList.toggle('align-center');
}

window.setRightAlign = () => {
  if (!document.querySelector('.cell.active')) {
    alert('Select cell');
    return 0;
  }
  document.querySelector('.cell.active').classList.remove('align-center');
  document.querySelector('.cell.active').classList.remove('align-left');
  document.querySelector('.cell.active').classList.toggle('align-right');
}

window.clearTable = () => {
  const cells = document.getElementsByClassName('cell');
  for (const cell of cells) {
    cell.innerHTML = '';
  }
}

window.saveTable = () => {
  const cells = document.getElementsByClassName('cell');
  let index = 0, content = '', cellStyles = {};
  for (const cell of cells) {
    content += `${cell.innerHTML},`;
    // read all clesses and inline styles
    if (cell.classList.length > 1) {
      for (const tmp of cell.classList) {
        if (tmp == 'cell' || tmp == 'active') {
          continue;
        } else if (tmp == 'bold' || tmp == 'italic') {
          // weight
          if (cellStyles[index]) {
            let indWeight = 0;
            for (let y=0;y<cellStyles[index].length;y++) {
              if (cellStyles[index][y].includes('weight')) {
                indWeight = y;
                break; // get y as index
              }
            }
            cellStyles[index][indWeight] += ` ${tmp}`;
          } else {
            // exist
            if (!cellStyles[index]) {
              cellStyles[index] = [];
            }
            cellStyles[index].push(`weight:${tmp}`);
          }
        } else if (tmp == 'align-right' || tmp == 'align-center' || tmp == 'align-left') {
          // align
          if (!cellStyles[index]) {
            cellStyles[index] = [];
          }
          cellStyles[index].push(tmp);
        }
      }
    }
    if (cell.style.backgroundColor) {
      if (!cellStyles[index]) {
        cellStyles[index] = [];
      }
      cellStyles[index].push(`background-color:${cell.style.backgroundColor}`);
    }
    index++;
  }
  content = content.substring(0, content.length-1);
  const tableData = getLastTable();
  if (tableData === false) {
    alert('Not set last table');
    return;
  }
  tableData.data = content;
  tableData.cellStyles = cellStyles;
  saveTableToLocalStorage(tableData);
  setLastTable(tableData);
  alert('Success save table');
}

window.setColor = () => {
  if (!document.querySelector('.cell.active')) {
    alert('Select cell');
    return 0;
  }
  const color = prompt('Enter color (en name of color or color hex)', 'black/#000000');
  document.querySelector('.cell.active').style.backgroundColor = color;
}