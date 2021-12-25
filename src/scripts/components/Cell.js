const createCell = () => {
  const cell = document.createElement("div");
  cell.className.add("cell");

  return cell;
};

export default createCell;
