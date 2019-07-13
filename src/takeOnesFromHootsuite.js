'use strict'

import debug from 'debug'

const d = debug('takeOnesFromHootsuite')

export const takeOnesFromHootsuite = (tweets) => {
  d('Input', tweets)

  const result = tweets.filter(tweet => tweet.source.match(/Hootsuite/))

  d('Output', result)

  return result
}

export default takeOnesFromHootsuite
