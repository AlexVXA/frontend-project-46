import { readFileSync } from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const parse = (filepath) => {
  const extname = path.extname(filepath);
  switch (extname) {
    case '.json':
      return JSON.parse(readFileSync(filepath, 'utf8'));
    case '.yml':
    case '.yaml':
      return yaml.load(readFileSync(filepath, 'utf8'));
    default:
      throw new Error('Sorry, this format do not support!');
  }
};

export default parse;
