import test from 'ava';
import { addCanonicalUrls } from '../src/addCanonicalUrls';

test('It should select the first found value among metadata.ogUrl, id or undefined and normalize relative urls', (t) => {
  const linksData = [
    { metadata: { ogUrl: 'http://foo.bar/1' } },
    { id: 'http://foo.bar/2' },
    { foo: 'bar' },
    { id: 'http://foo.bar/2', metadata: { ogUrl: '/relative' } },
  ];

  const linksDataWithCanonicalUrl = addCanonicalUrls(linksData);
  t.is(linksDataWithCanonicalUrl[0].url, 'http://foo.bar/1');
  t.is(linksDataWithCanonicalUrl[1].url, 'http://foo.bar/2');
  t.is(linksDataWithCanonicalUrl[2].url, undefined);
  t.is(linksDataWithCanonicalUrl[3].url, 'http://foo.bar/relative');
});
