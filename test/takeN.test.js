'use strict'

import test from 'ava'
import { takeN } from '../src/takeN'

test('it should take the first n elements from an array with more than n elements', (t) => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  t.deepEqual(takeN(4)(arr), [1, 2, 3, 4])
})

test('it should take all the elements from an array with less than n elements', (t) => {
  const arr = [1, 2]
  t.deepEqual(takeN(4)(arr), [1, 2])
})
