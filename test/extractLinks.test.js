'use strict'

import test from 'ava'
import { extractLinks } from '../src/extractLinks'

test('It should extract links from a set of tweets', (t) => {
  const tweets = [
    { entities: { urls: [{ expanded_url: 'url1' }] } },
    { entities: { urls: [{ expanded_url: 'url2' }, { expanded_url: 'url3' }] } },
    { entities: { } }
  ]

  const links = extractLinks(tweets)
  t.deepEqual(links, ['url1', 'url2', 'url3'])
})
