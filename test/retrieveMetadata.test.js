'use strict'

import test from 'ava'
import { spy } from 'sinon'
import { retrieveMetadata } from '../src/retrieveMetadata'

test('it should retrieve metadata for a set of given links', async (t) => {
  const metadataMap = {
    uri1: {
      ogImage: 'image1'
    },
    uri2: {
      twitterImageSrc: 'image2',
      ogTitle: 'title2',
      ogDescription: 'description2'
    },
    uri3: {
      ogImage: 'image3',
      title: 'title3',
      twitterDescription: 'description3'
    },
    uri4: {
      ogImage: 'image4',
      ogTitle: 'title4',
      description: 'description4'
    }
  }

  const metaExtractor = spy(
    (obj, cb) => setImmediate(() => {
      cb(null, { id: obj.id, ...metadataMap[obj.uri] })
    })
  )

  const links = [
    {
      id: 'uri1',
      og_object: {
        title: 'title1',
        description: 'description1'
      }
    },
    {
      id: 'uri2'
    },
    {
      id: 'uri3'
    },
    {
      id: 'uri4'
    }
  ]

  const data = await (retrieveMetadata(metaExtractor)(links))

  t.is(metaExtractor.callCount, links.length)
  t.snapshot(data)
})

test('it should return undefined if one link fails', async (t) => {
  // on someUri2 it will fail
  const metaExtractor = (obj, cb) => setImmediate(
    () => {
      if (obj.uri === 'someUri2') {
        return cb(new Error('some error'))
      }

      return cb(null, obj)
    }
  )

  const links = [1, 2, 3].map(i => ({ id: `someUri${i}` }))
  const result = await (retrieveMetadata(metaExtractor)(links))
  t.is(result[1], undefined)
  t.snapshot(result)
})

test('it should handle multiple failures', async (t) => {
  // on someUri2 it will fail
  const metaExtractor = (obj, cb) => setImmediate(
    () => {
      if (obj.uri === 'someUri2' || obj.uri === 'someUri3') {
        return cb(new Error('some error'))
      }

      return cb(null, obj)
    }
  )

  const links = [1, 2, 3].map(i => ({ id: `someUri${i}` }))
  const result = await (retrieveMetadata(metaExtractor)(links))
  t.is(result[1], undefined)
  t.is(result[2], undefined)
  t.snapshot(result)
})
