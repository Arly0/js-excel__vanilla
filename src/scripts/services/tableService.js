import {
  getLastId
} from './routeService.js'
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
  return {
    // TODO: maybe add ID
    id: getLastId(),
    name: tableName,
    date: dateCreation
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