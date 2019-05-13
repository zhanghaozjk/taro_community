export function emptyString(str) {
  return str.replace(/(^\s*)|(\s*$)/g, "").length === 0;
}

export function checkEmail(str) {
  let pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  return pattern.test(str)
}

export function getAliKey() {
  return '77b905e92bf4ec9f148c0d04b6af646f';
}

export function getAliMapUrl() {
  return 'https://restapi.amap.com/v3/ip'
}
