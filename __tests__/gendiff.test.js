import { test, expect } from '@jest/globals';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const fixturePath = (filename) => join(__dirname, '..', '__tests__', '__fixtures__', filename);
const getFixture = (filename) => readFileSync(fixturePath(filename), 'utf8');
test('stylish flat JSON', () => {
  const expected = getFixture('stylish_flat.txt').trim();
  const actual = genDiff(
    fixturePath('example1.json'),
    fixturePath('example2.json'),
    'stylish',
  );
  expect(actual).toBe(expected);
});
test('stylish flat YAML', () => {
  const expected = getFixture('stylish_flat.txt').trim();
  const actual = genDiff(fixturePath('example5.yml'), fixturePath('example6.yml'), 'stylish');
  expect(actual).toBe(expected);
});
test('stylish recursive JSON', () => {
  const expected = getFixture('stylish_recursive.txt').trim();
  const actual = genDiff(
    fixturePath('example7.json'),
    fixturePath('example8.json'),
    'stylish',
  );
  expect(actual).toBe(expected);
});
test('stylish recursive YML', () => {
  const expected = getFixture('stylish_recursive.txt').trim();
  const actual = genDiff(fixturePath('example9.yml'), fixturePath('example10.yml'), 'stylish');
  expect(actual).toBe(expected);
});
test('stylish recursive mixed', () => {
  const expected = getFixture('stylish_recursive.txt').trim();
  const actual = genDiff(
    fixturePath('example7.json'),
    fixturePath('example10.yml'),
    'stylish',
  );
  expect(actual).toBe(expected);
});
test('plain recursive mixed', () => {
  const expected = getFixture('plain.txt').trim();
  const actual = genDiff(fixturePath('example7.json'), fixturePath('example10.yml'), 'plain');
  expect(actual).toBe(expected);
});
