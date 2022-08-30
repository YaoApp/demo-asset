/**
 * 必填项验证
 */
function Require(value, row) {
  if (value) {
    return row;
  }
  return false;
}
