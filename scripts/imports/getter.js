/**
 * 根据传入参数解析资产
 */
function Asset(value, row) {
  if (!value) {
    return false;
  }
  return row;
}

/**
 * 根据传入参数解析软件
 */
function Software(value, row) {
  if (!value) {
    return false;
  }
  row[2] = [];
  let items = value.split(",");
  // console.log(items);
  items.forEach((item) => {
    row[2].push({ name: item.trim() });
  });
  return row;
}

/**
 * 根据传入参数合同软件
 */
function Contract(value, row) {
  if (!value) {
    return false;
  }
  row[3] = value.trim();
  return row;
}
