import test from 'ava';
import { sortByScore } from '../src/sortByScore';

test('it should sort objects by descendent score', (t) => {
  const data = [2, 1, 5, 4, 3].map(i => ({ score: i }));
  const expectedResult = [1, 2, 3, 4, 5].reverse().map(i => ({ score: i }));
  t.deepEqual(sortByScore(data), expectedResult);
});
