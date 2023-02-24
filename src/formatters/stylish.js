/* eslint-disable object-curly-newline */
/* eslint-disable no-param-reassign */
const stylish = (arr) => {
  const str = arr.reduce((acc, prop) => {
    const { key, status, value, previous, current } = prop;
    switch (status) {
      case 'removed':
        acc += `\n  - ${key}: ${value}`;
        break;
      case 'added':
        acc += `\n  + ${key}: ${value}`;
        break;
      case 'updated':
        acc += `\n  - ${key}: ${previous}\n  + ${key}: ${current}`;
        break;
      case 'unmodified':
        acc += `\n    ${key}: ${value}`;
        break;
      case 'nested':
        acc += String(stylish(prop.children));
        break;
      default:
        acc += `\n   ${key}: ${value}`;
        break;
    }
    return acc;
  }, '');
  return `{${str}\n}`;
};

export default stylish;
