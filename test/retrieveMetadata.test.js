import test from 'ava';
import { spy } from 'sinon';
import { retrieveMetadata } from '../src/retrieveMetadata';

test('it should retrieve metadata for a set of given links', (t) => {
  const metadataMap = {
    uri1: {
      ogImage: 'image1',
    },
    uri2: {
      twitterImageSrc: 'image2',
      ogTitle: 'title2',
      ogDescription: 'description2',
    },
    uri3: {
      ogImage: 'image3',
      title: 'title3',
      twitterDescription: 'description3',
    },
    uri4: {
      ogImage: 'image4',
      ogTitle: 'title4',
      description: 'description4',
    },
  };

  const metaExtractor = spy(
    (obj, cb) => setImmediate(() => cb(null, { ...obj, ...metadataMap[obj.uri] })),
  );

  const links = [
    {
      uri: 'uri1',
      og_object: {
        title: 'title1',
        description: 'description1',
      },
    },
    { uri: 'uri2' },
    { uri: 'uri3' },
    { uri: 'uri4' },
  ];

  const expectedResult = links.map((link, i) => ({
    uri: `uri${i}`,
    image: `image${i}`,
    title: `title${i}`,
    description: `description${i}`,
  }));

  retrieveMetadata(metaExtractor)(links)
    .then((data) => {
      t.is(metaExtractor.callCount, links.length);
      t.deepEqual(data, expectedResult);
    });
});

test('it should return undefined if one link fails', (t) => {
  // on someUri2 it will fail
  const metaExtractor = (obj, cb) => setImmediate(
    () => {
      if (obj.uri === 'someUri2') {
        return cb(new Error('some error'));
      }

      return cb(null, obj);
    },
  );

  const links = [1, 2, 3].map(i => ({ id: `someUri${i}` }));
  const expectedResult = [
    { id: 'someUri1', image: null, metadata: { uri: 'someUri1' } },
    undefined,
    { id: 'someUri3', image: null, metadata: { uri: 'someUri3' } },
  ];
  retrieveMetadata(metaExtractor)(links).then((result) => {
    t.deepEqual(result, expectedResult);
  });
});

test('it should handle multiple failures', (t) => {
  // on someUri2 it will fail
  const metaExtractor = (obj, cb) => setImmediate(
    () => {
      if (obj.uri === 'someUri2' || obj.uri === 'someUri3') {
        return cb(new Error('some error'));
      }

      return cb(null, obj);
    },
  );

  const links = [1, 2, 3].map(i => ({ id: `someUri${i}` }));
  const expectedResult = [
    { id: 'someUri1', image: null, metadata: { uri: 'someUri1' } },
    undefined,
    undefined,
  ];
  retrieveMetadata(metaExtractor)(links).then((result) => {
    t.deepEqual(result, expectedResult);
  });
});
