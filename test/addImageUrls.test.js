import test from 'ava';
import { addImageUrls } from '../src/addImageUrls';

test('It should get an image from the metadata if present or a default image if not', (t) => {
  const testLinks = [
    { metadata: { ogImage: 'ogImage' } },
    { metadata: { twitterImageSrc: 'twitterImageSrc' } },
    { metadata: { host: 'domain.com' } },
  ];

  const linksWithImages = addImageUrls(testLinks);

  t.is(linksWithImages[0].image, 'ogImage');
  t.is(linksWithImages[1].image, 'twitterImageSrc');
  t.regex(linksWithImages[2].image, /domain\.com/);
});
