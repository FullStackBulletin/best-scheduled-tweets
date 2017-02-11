import test from 'ava';
import { uniqueBy } from '../src/uniqueBy';

test('it should remove duplicates from a given array', (t) => {
  const data = [1, 2, 3, 4, 1, 2, 3].map(i => ({ number: i }));
  const expectedResult = [1, 2, 3, 4].map(i => ({ number: i }));
  t.deepEqual(uniqueBy('number')(data), expectedResult);
});
