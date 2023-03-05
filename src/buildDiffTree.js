import _ from 'lodash';
import isObj from './isObj.js';

const hasKey = (obj, key) => !!Object.keys(obj).filter((temp) => key === temp).length;

const buildDiffTree = (obj1, obj2) => {
  const keys = _.sortBy(_.uniq([...Object.keys(obj1), ...Object.keys(obj2)]));
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

export default buildDiffTree;
