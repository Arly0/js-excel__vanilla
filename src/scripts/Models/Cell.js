export default class Cell {
  cell = null;

  constructor() {
    this.cell = document.createElement("div");
    this.cell.className.add("cell");
    this.cell.addEventListener("dblclick", (Event) => {});
  }

  renderCell() {
    return;
  }
}
