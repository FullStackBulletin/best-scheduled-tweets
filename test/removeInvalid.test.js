import test from 'ava';
import { removeInvalid } from '../src/removeInvalid';

test('it should remove invalid values from an array', (t) => {
  const data = ['https://1', 'http://2', undefined, 3, undefined, 4, 5, undefined, 6];
  const expectedResult = ['https://1', 'http://2'];
  t.deepEqual(removeInvalid(data), expectedResult);
});
