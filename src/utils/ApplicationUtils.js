export function emptyString(str) {
  return str.replace(/(^\s*)|(\s*$)/g, "").length === 0;
}

export function checkEmail(str) {
  let pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  return pattern.test(str)
}
