import { tableSize } from './../init.js';
/**
 * this file use only for work with layout part
 */

/**
 * 
 * @param {string} data 
 * @returns 1
 */
export const generateTableLayout = (tableData) => {
  let layout = "";
  const data = tableData.data.split(','),
  styles = tableData.cellStyles;

  for (let i = 0, dataIndex = 0; i < tableSize; i++,dataIndex += tableSize) {
    layout += "<div class='row'>";
    for (let j = 0; j < tableSize; j++) {
      if (styles[dataIndex+j]) {
        let background = '', weight = '', align = '';
        for (let x = 0; x < styles[dataIndex+j].length; x++) {
          if (styles[dataIndex+j][x].includes('background')) {
            background = `style="${styles[dataIndex+j][x]}"`;
          } else if (styles[dataIndex+j][x].includes('weight')) {
            weight = styles[dataIndex+j][x].split(':')[1]; // italic, bold // can be multi
          } else if (styles[dataIndex+j][x].includes('align')) {
            align = styles[dataIndex+j][x]; // center // cannot be multiple
          }
        }
        
        layout += `<div ${background} class='cell ${align} ${weight}'>${data[dataIndex+j]}</div>`;
      } else {
        layout += `<div class='cell'>${data[dataIndex+j]}</div>`;
      }
    }
    layout += "</div>";
  }
  document.querySelector('.table#table').innerHTML = layout;
  return 1;
}