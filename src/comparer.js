import { readFileSync } from 'fs';
import path from 'path';

const getAbsPath = (filePath) => path.resolve(process.cwd(), filePath);

const path1 = getAbsPath('__tests__/__fixtures__/example1.json');
const path2 = getAbsPath('__tests__/__fixtures__/example2.json');

const data1 = JSON.parse(readFileSync(path1, 'utf8'));
const data2 = JSON.parse(readFileSync(path2, 'utf8'));

const isObj = (val) => typeof val === 'object' && !Array.isArray(val) && val !== null;

const hasKey = (obj, key) => !!Object.keys(obj).filter((current) => key === current).length;

const diff = (obj1, obj2) => {
  const keys = Array.from(new Set([...Object.keys(obj1), ...Object.keys(obj2)]));
  const result = keys.map((key) => {
    const obj1HasKey = hasKey(obj1, key);
    const obj2HasKey = hasKey(obj2, key);
    if (isObj(key) && obj1HasKey && obj2HasKey) {
      return { key, status: 'nested', children: diff(obj1[key], obj2[key]) };
    }
    if (obj1HasKey && obj2HasKey) {
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
  return result;
};

diff(data1, data2);
