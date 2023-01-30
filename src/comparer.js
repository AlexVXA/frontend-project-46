import { readFileSync } from 'fs';
import path from 'path';

const getAbsPath = (filePath) => path.resolve(process.cwd(), filePath);
const isObj = (val) => typeof val === 'object' && !Array.isArray(val) && val !== null;
const hasKey = (obj, key) => !!Object.keys(obj).filter((temp) => key === temp).length;

const buildDiffTree = (obj1, obj2) => {
  const keys = Array.from(new Set([...Object.keys(obj1), ...Object.keys(obj2)])).sort();
  const result = keys.map((key) => {
    const obj1HasKey = hasKey(obj1, key);
    const obj2HasKey = hasKey(obj2, key);
    if (isObj(obj1[key]) && isObj(obj2[key])) {
      return { key, status: 'nested', children: buildDiffTree(obj1[key], obj2[key]) };
    }
    if (obj1[key] === obj2[key]) {
      return { key, status: 'unmodified', value: obj1[key] };
    }
    if (!obj1HasKey && obj2HasKey) {
      return { key, status: 'added', value: obj2[key] };
    }
    if (obj1HasKey && !obj2HasKey) {
      return { key, status: 'removed', value: obj1[key] };
    }
    return {
      key,
      status: 'updated',
      previous: obj1[key],
      current: obj2[key],
    };
  });
  return result.flat(Infinity);
};

const genDiff = (arr) => {
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
        acc += `${genDiff(prop.children)}`;
        break;
      default:
        acc += `\n   ${key}: ${value}`;
        break;
    }
    return acc;
  }, '');
  return `{${str}\n}`;
};

export default (filePath1, filePath2) => {
  const path1 = getAbsPath(filePath1);
  const path2 = getAbsPath(filePath2);
  const data1 = JSON.parse(readFileSync(path1, 'utf8'));
  const data2 = JSON.parse(readFileSync(path2, 'utf8'));
  const diffTree = buildDiffTree(data1, data2);
  return genDiff(diffTree);
};
