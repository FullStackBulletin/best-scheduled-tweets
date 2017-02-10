import test from 'ava';
import { addImageUrls } from '../src/addImageUrls';

test('It should get an image from the metadata if present or a default image if not', (t) => {
  const testLinks = [
    { metadata: { ogImage: 'ogImage' } },
    { metadata: { twitterImageSrc: 'twitterImageSrc' } },
    { metadata: { images: new Set(['image1']) } },
    { metadata: { host: 'domain.com' } },
  ];

  const linksWithImages = addImageUrls(testLinks);

  t.is(linksWithImages[0].image, 'ogImage');
  t.is(linksWithImages[1].image, 'twitterImageSrc');
  t.is(linksWithImages[2].image, 'image1');
  t.regex(linksWithImages[3].image, /domain\.com/);
});
