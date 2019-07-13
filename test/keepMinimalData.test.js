'use strict'

import test from 'ava'
import { keepMinimalData } from '../src/keepMinimalData'

test('it should keep minimal data from an array of objects with many properties', (t) => {
  const data = [{
    a: 'a',
    b: 'b',
    c: 'c',
    title: 'title',
    description: 'description',
    url: 'url',
    image: 'image',
    score: 1,
    d: 'd'
  }]

  const expectedResult = [{
    title: 'title',
    description: 'description',
    url: 'url',
    image: 'image',
    score: 1
  }]

  t.deepEqual(keepMinimalData(data), expectedResult)
})
