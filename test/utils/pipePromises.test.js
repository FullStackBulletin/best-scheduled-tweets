import test from 'ava';
import { pipePromises } from '../../src/utils/pipePromises';

test('It should pipe promises', (t) => {
  const add1 = value => new Promise((resolve) => {
    setTimeout(resolve(value + 1), 10);
  });

  pipePromises(
    1,
    add1,
    add1,
    add1,
  ).then(val => t.is(val, 4));
});

test('It should reject if one promise rejects', (t) => {
  pipePromises(
    1,
    () => Promise.reject(new Error('some error')),
  ).catch(err => t.is(err.message, 'some error'));
});
