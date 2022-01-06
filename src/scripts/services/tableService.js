import { tableSize } from '../init.js';
import {
  getLastId
} from './routeService.js';
/**
 * 
 * @param {String} tableName name of table
 * @returns False or Object
 */
 export const createTableData = (tableName) => {
  if (!tableName) {
    alert('Yoy try to add table without name. Name is required');
    return false;
  }
  const dateCreation = new Date();
  let data = '';
  for(let i=0;i<(tableSize*tableSize)-1;i++) {
    data += ',';
  }
  /**
   * cellStyles {
   *  numberCell: [
   *    'background-color:red',
   *    'weight:italic, bold',
   *    'align-center'
   *  ]
   * }
   * numberCell - 0,1,2,3,...,100
   * style - {%align, weight, background%}
   * захвостка в том, что align, weight идут через классы, а цвет - через инлайн стиль, то есть реализовывать нужно по-разному
   */
  return {
    // TODO: maybe add ID
    id: getLastId(),
    name: tableName,
    date: dateCreation,
    data: data,
    cellStyles: {}
  }
}

/**
 * 
 * @param {Object} tableData table data
 * @returns Boolean
 */
export const saveTableToLocalStorage = (tableData) => {
  // name, date create or update, first value(?)
  try {
    localStorage.setItem(`[${tableData.id}]table-${tableData.name}`, JSON.stringify(tableData));
    return true
  } catch (error) {
    console.log(error)
  }
  return false
};

/**
 * @param cell Int
 * @param value String
 * @returns Boolean
 */
export const addDataToTable = (cell, value) => {
  // try to find this cell on obj
  return true;
}

export const getLocalStorageTable = (id) => {
  let keys = Object.keys(localStorage),
  i = keys.length, itemList = [], item = null;
  if (i == 0) {
    alert('You dont set any table');
    return false; // end event, localstorage is empty
  }
  while (i--) {
    if (keys[i].includes('table-')) {
      itemList.push(JSON.parse(localStorage.getItem(keys[i])));
    }
  }
  return itemList.includes(`[${id}]`)
}