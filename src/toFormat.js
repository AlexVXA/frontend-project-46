import stylish from './formatters/stylish.js';
import plain from './formatters/plain.js';

export default (format, diffTree) => {
  switch (format) {
    case 'stylish':
      return stylish(diffTree);
    case 'plain':
      return plain(diffTree);
    default:
      throw new Error(`${format} do not supported!`);
  }
};
