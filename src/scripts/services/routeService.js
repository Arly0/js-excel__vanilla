/**
 * 
 * @returns last id of table
 */
export const getLastId = () => {
  setLastId();
  const lastID = parseInt(localStorage.getItem('last_id'));
  return lastID ? lastID : 0;
}

/**
 * 
 */
export const setLastId = () => {
  let lastID = parseInt(localStorage.getItem('last_id'));
  lastID = isNaN(lastID) ? 0 : (lastID+1);
  localStorage.setItem('last_id', lastID);
}

/**
 * 
 * @returns {Object} lastTable info
 */
export const getLastTable = () => {
  const lastTable = JSON.parse(localStorage.getItem('last_table'));
  return lastTable ? lastTable : false;
}

/**
 * 
 * @param {Object} tableData info about table
 */
export const setLastTable = (tableData) => {
  localStorage.setItem('last_table', JSON.stringify(tableData));
}