export default function emptyString(str) {
  if (str.replace(/(^\s*)|(\s*$)/g, "").length ==0) {
    return true;
  }
  return false
}
