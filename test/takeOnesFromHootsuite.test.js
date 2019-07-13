'use strict'

import test from 'ava'
import { takeOnesFromHootsuite } from '../src/takeOnesFromHootsuite'

test('it should take only the tweets posted with Hootsuite', (t) => {
  const tweets = [
    'Tweetbot',
    'Hootsuite',
    'Posted with Hootsuite',
    'Twitter web',
    'Tweetdeck'
  ].map(client => ({
    source: client
  }))

  const expectedResult = [
    tweets[1],
    tweets[2]
  ]

  t.deepEqual(
    takeOnesFromHootsuite(tweets),
    expectedResult
  )
})
