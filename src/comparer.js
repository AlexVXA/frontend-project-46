/* eslint-disable no-param-reassign */
import { readFileSync } from 'fs';
import path from 'path';
import yaml from 'js-yaml';

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
    // eslint-disable-next-line object-curly-newline
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

const parse = (filepath) => {
  const extname = path.extname(filepath);
  switch (extname) {
    case '.json':
      return JSON.parse(readFileSync(filepath, 'utf8'));
    case '.yml':
      return yaml.load(readFileSync(filepath, 'utf8'));
    case '.yaml':
      return yaml.load(readFileSync(filepath, 'utf8'));
    default:
      throw new Error('Sorry, this format do not support!');
  }
};

export default (filePath1, filePath2) => {
  const path1 = getAbsPath(filePath1);
  const path2 = getAbsPath(filePath2);
  const data1 = parse(path1);
  const data2 = parse(path2);
  const diffTree = buildDiffTree(data1, data2);
  return genDiff(diffTree);
};
