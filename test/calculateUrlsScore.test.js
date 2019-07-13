'use strict'

import test from 'ava'
import { calculateUrlsScore } from '../src/calculateUrlsScore'

test('It should calculate and add the score to a set of links', (t) => {
  const urls = [
    { engagement: { comment_count: 10, share_count: 17 } },
    { engagement: { comment_count: 10, comment_plugin_count: 1 } },
    { engagement: { share_count: 17, reaction_count: 2 } },
    {}
  ]

  const urlsWithScore = calculateUrlsScore(urls)
  t.is(urlsWithScore[0].score, 27)
  t.is(urlsWithScore[1].score, 11)
  t.is(urlsWithScore[2].score, 19)
  t.is(urlsWithScore[3].score, 0)
})
