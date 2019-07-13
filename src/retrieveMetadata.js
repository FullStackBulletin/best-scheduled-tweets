'use strict'

import { mapLimit } from 'async'
import { coalesce, get } from 'object-path'
import debug from 'debug'

const d = debug('retrieveMetadata')

const retrieveMetadataFromLink = metaExtractor => (link, cb) => {
  metaExtractor({ uri: link.id, timeout: 10000 }, (err, metadata) => {
    if (err) {
      // if it's not possible to retrieve metadata ignore the link
      return cb(null)
    }

    const image = coalesce(metadata, ['ogImage', 'twitterImageSrc'], null)
    const title = get(link, 'og_object.title') || coalesce(metadata, ['ogTitle', 'title'])
    const description = get(link, 'og_object.description') ||
      coalesce(metadata, ['ogDescription', 'twitterDescription', 'description'])

    return cb(null, {
      ...link, image, title, description, metadata
    })
  })
}

export const retrieveMetadata = metaExtractor => (links) => {
  d('Input', links)

  const result = new Promise((resolve, reject) => {
    const limit = 10
    mapLimit(
      links,
      limit,
      retrieveMetadataFromLink(metaExtractor),
      (err, linksWithMetadata) => {
        if (err) {
          return reject(err)
        }
        return resolve(linksWithMetadata)
      }
    )
  })

  d('Output', result)

  return result
}

export default retrieveMetadata
