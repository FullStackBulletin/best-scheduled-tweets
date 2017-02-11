import test from 'ava';
import { unique } from '../src/unique';

test('it should remove duplicates from a given array', (t) => {
  const data = [1, 2, 3, 4, 1, 2, 3];
  const expectedResult = [1, 2, 3, 4];
  t.deepEqual(unique(data), expectedResult);
});
