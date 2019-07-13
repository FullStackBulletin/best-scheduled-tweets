'use strict'

import test from 'ava'
import { spy } from 'sinon'
import { getUrlsInfo } from '../src/getUrlsInfo'

test('It should get urls info from Facebook', async (t) => {
  const fbApp = {
    /* eslint standard/no-callback-literal: 0 */
    api: spy((_, query, cb) => {
      setImmediate(() => cb({ id: query.id, info: 'some info' }))
    })
  }

  const urls = ['url1', 'url2', 'url3']

  const urlsInfo = await (getUrlsInfo(fbApp)(urls))
  urls.forEach((u, i) => {
    const callArgs = fbApp.api.getCall(i).args
    const encodedUrl = callArgs[1]
    t.is(encodedUrl.id, encodeURIComponent(u))
  })

  t.deepEqual(urlsInfo, urls.map(url => ({ id: url, info: 'some info' })))
})

test('It should reject if one of the api calls to Facebook fails', async (t) => {
  const fbApp = {
    /* eslint standard/no-callback-literal: 0 */
    api: spy((_, url, cb) => setImmediate(() => cb({ error: 'some error' })))
  }

  const urls = ['url1', 'url2', 'url3']

  await t.throwsAsync(() => {
    return getUrlsInfo(fbApp)(urls)
  }, '"some error"')
})

test('It should reject if one of the api calls to Facebook fails without a message', async (t) => {
  const fbApp = {
    api: spy((_, url, cb) => setImmediate(() => cb(null)))
  }

  const urls = ['url1', 'url2', 'url3']

  await t.throwsAsync(() => {
    return getUrlsInfo(fbApp)(urls)
  }, 'Unexpected error')
})
