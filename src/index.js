import path from 'path';
import parse from './parser.js';
import buildDiffTree from './buildDiffTree.js';
import stylish from './formatters/stylish.js';

const getAbsPath = (filePath) => path.resolve(process.cwd(), filePath);

export default (filePath1, filePath2) => {
  const path1 = getAbsPath(filePath1);
  const path2 = getAbsPath(filePath2);
  const data1 = parse(path1);
  const data2 = parse(path2);
  const diffTree = buildDiffTree(data1, data2);
  return stylish(diffTree);
};
