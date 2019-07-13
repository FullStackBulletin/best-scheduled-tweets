'use strict'

import test from 'ava'
import { addImageUrls } from '../src/addImageUrls'

test('It should get an image from the metadata if present or a default image if not', (t) => {
  const testLinks = [
    { metadata: { ogImage: 'http://ogImage.com/a.png' } },
    { metadata: { twitterImageSrc: 'https://twitterImageSrc.net/b.jpg' } },
    { metadata: { host: 'domain.com' } },
    { metadata: { ogImage: 'invalid' } }
  ]

  const linksWithImages = addImageUrls(testLinks)

  t.is(linksWithImages[0].image, 'http://ogImage.com/a.png')
  t.is(linksWithImages[1].image, 'https://twitterImageSrc.net/b.jpg')
  t.regex(linksWithImages[2].image, /placeimg\.com/)
  t.regex(linksWithImages[3].image, /placeimg\.com/)
})
