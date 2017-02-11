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

test('it should reject if one link fails', (t) => {
  const metaExtractor = spy((obj, cb) => setImmediate(() => cb(new Error('some error'))));

  const links = [1, 2, 3].map(i => ({ id: `someUri${i}` }));

  t.throws(retrieveMetadata(metaExtractor)(links), 'some error');
});
