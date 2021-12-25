export default class Table {
  tableName = null;
  dateCreating = null;

  constructor(tableName) {
    this.tableName = tableName;
    this.dateCreating = new Date().toDateString();
    console.log(this.tableName, this.dateCreating);
  }

  createCell() {}
}
