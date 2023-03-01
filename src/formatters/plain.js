import isObj from '../isObj.js';

const stringify = (node) => {
  if (typeof node === 'string') {
    return `'${node}'`;
  }
  if (isObj(node)) {
    return '[complex value]';
  }
  return node;
};

const plain = (diffTree) => {
  const iter = (node, path = '') => {
    const strings = node.reduce((acc, prop) => {
      const { key, status, value, previous, current, children } = prop;
      const currentPath = [path, key].join('.');
      switch (status) {
        case 'removed':
          acc.push(`Property '${currentPath.substring(1)}' was removed`);
          break;
        case 'added':
          acc.push(
            `Property '${currentPath.substring(1)}' was added with value: ${stringify(value)}`,
          );
          break;
        case 'updated':
          acc.push(
            `Property '${currentPath.substring(1)}' was updated. From ${stringify(
              previous,
            )} to ${stringify(current)}`,
          );
          break;
        case 'nested':
          acc.push(iter(children, currentPath));
          break;
        case 'unmodified':
        default:
          break;
      }
      return acc;
    }, []);
    return strings.join('\n');
  };
  return iter(diffTree);
};

export default plain;
