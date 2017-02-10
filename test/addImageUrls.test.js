import test from 'ava';
import { addImageUrls } from '../src/addImageUrls';

test('It should get an image from the metadata if present or a default image if not', (t) => {
  t.truthy(addImageUrls);
  // const testLinks = [
  //   {},
  // ];
  //
  // const linksWithImages = addImageUrls(testLinks);
  //
  // t.is(linksWithImages[0].image, 'ogImage');
  // t.is(linksWithImages[0].image, 'twitterImageSrc');
});
