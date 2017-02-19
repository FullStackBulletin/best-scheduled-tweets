import test from 'ava';
import { spy } from 'sinon';
import { retrieveMetadata } from '../src/retrieveMetadata';

test('it should retrieve metadata for a set of given links', (t) => {
  const metaExtractor = spy((obj, cb) => setImmediate(() => cb(null, { ...obj, metadata: { ogImage: 'someImage' } })));

  const links = [1, 2, 3].map(i => ({ id: `someUri${i}` }));
  const expectedResult = [1, 2, 3].map(i => ({
    uri: `someUri${i}`,
    metadata: { ogImage: 'someImage' },
    image: 'someImage',
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
