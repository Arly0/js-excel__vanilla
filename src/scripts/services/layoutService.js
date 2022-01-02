import { tableSize } from './../init.js';
/**
 * this file use only for work with layout part
 */

/**
 * 
 * @param {string} data 
 * @returns 1
 */
export const generateTableLayout = (data) => {
  let layout = "", tableData = data.split(',');
  for (let i = 0, dataIndex = 0; i < tableSize; i++,dataIndex += tableSize) {
    layout += "<div class='row'>";
    for (let j = 0; j < tableSize; j++) {
      layout += `<div class='cell'>${tableData[dataIndex+j]}</div>`;
    }
    layout += "</div>";
  }
  document.querySelector('.table#table').innerHTML = layout;
  return 1;
}