'use strict'

import test from 'ava'
import { removeBlacklistedUrls } from '../src/removeBlacklistedUrls'

test('it should remove blacklisted urls from a list of urls', (t) => {
  const blacklist = [2, 3, 5]
  const arr = [1, 2, 3, 4, 5, 6]
  const expectedResult = [1, 4, 6]

  t.deepEqual(removeBlacklistedUrls(blacklist)(arr), expectedResult)
})
