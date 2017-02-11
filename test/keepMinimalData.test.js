import test from 'ava';
import { keepMinimalData } from '../src/keepMinimalData';

test('it should keep minimal data from an array of objects with many properties', (t) => {
  const data = [{
    a: 'a',
    b: 'b',
    c: 'c',
    og_object: { title: 'title1', description: 'description1' },
    url: 'url1',
    image: 'image1',
    score: 1,
    d: 'd',
  }, {
    a: 'a',
    b: 'b',
    c: 'c',
    metadata: { ogTitle: 'title2', ogDescription: 'description2' },
    url: 'url2',
    image: 'image2',
    score: 2,
    d: 'd',
  }, {
    a: 'a',
    b: 'b',
    c: 'c',
    metadata: { title: 'title3', twitterDescription: 'description3' },
    url: 'url3',
    image: 'image3',
    score: 3,
    d: 'd',
  }, {
    a: 'a',
    b: 'b',
    c: 'c',
    metadata: { title: 'title4', description: 'description4' },
    url: 'url4',
    image: 'image4',
    score: 4,
    d: 'd',
  }];

  const expectedResult = [1, 2, 3, 4].map(i => ({
    title: `title${i}`,
    description: `description${i}`,
    url: `url${i}`,
    image: `image${i}`,
    score: i,
  }));

  t.deepEqual(keepMinimalData(data), expectedResult);
});
