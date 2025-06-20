function readFile() {
  return new Promise(res => {
    let input = document.createElement('input');
    input.type = 'file';
    input.onchange = e => {
      let file = e.target.files[0];
      res(file);
    };
    input.click();
  });
}

// 深拷贝
function deepClone(source) {
  if (typeof source !== 'object' || source == null) {
    return source;
  }
  const target = Array.isArray(source) ? [] : {};
  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (typeof source[key] === 'object' && source[key] !== null) {
        target[key] = deepClone(source[key]);
      } else {
        target[key] = source[key];
      }
    }
  }
  return target;
}
export { readFile, deepClone };
