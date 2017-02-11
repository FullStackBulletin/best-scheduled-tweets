import test from 'ava';
import { removeUndefined } from '../src/removeUndefined';

test('it should remove undefined values from an array', (t) => {
  const data = [1, 2, undefined, 3, undefined, 4, 5, undefined, 6];
  const expectedResult = [1, 2, 3, 4, 5, 6];
  t.deepEqual(removeUndefined(data), expectedResult);
});
