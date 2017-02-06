import test from 'ava';
import { flatten } from '../../src/utils/flatten';

test('It flattens an array with nested arrays', (t) => {
  const arr = [[1], [2], [3]];
  t.deepEqual(flatten(arr), [1, 2, 3]);
});
