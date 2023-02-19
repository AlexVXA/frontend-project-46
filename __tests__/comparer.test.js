import { test, expect } from '@jest/globals';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/comparer.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const fixturePath = (filename) => join(__dirname, '..', '__tests__', '__fixtures__', filename);
const getFixture = (filename) => readFileSync(fixturePath(filename), 'utf8');
test('stylish flat JSON', () => {
  const expected = getFixture('stylish_flat.txt').trim();
  const actual = genDiff(fixturePath('example1.json'), fixturePath('example2.json'));
  expect(actual).toBe(expected);
});
test('stulish flat YAML', () => {
  const expected = getFixture('stylish_flat.txt').trim();
  const actual = genDiff(fixturePath('example5.yml'), fixturePath('example6.yml'));
  expect(actual).toBe(expected);
});
