import test from 'ava';
import { spy } from 'sinon';
import { getUrlsInfo } from '../src/getUrlsInfo';

test('It should get urls info from Facebook', (t) => {
  const fbApp = {
    api: spy((url, cb) => setImmediate(() => cb({ id: url, info: 'some info' }))),
  };

  const urls = ['url1', 'url2', 'url3'];

  getUrlsInfo(fbApp)(urls)
  .then((urlsInfo) => {
    urls.forEach((url, i) => {
      const [encodedUrl] = fbApp.api.getCall(i).args;
      t.is(encodedUrl, encodeURIComponent(url));
    });

    t.deepEqual(urlsInfo, urls.map(url => ({ id: url, info: 'some info' })));
  });
});

test('It should reject if one of the api calls to Facebook fails', (t) => {
  const fbApp = {
    api: spy((url, cb) => setImmediate(() => cb({ error: 'some error' }))),
  };

  const urls = ['url1', 'url2', 'url3'];

  t.throws(getUrlsInfo(fbApp)(urls), '"some error"');
});

test('It should reject if one of the api calls to Facebook fails without a message', (t) => {
  const fbApp = {
    api: spy((url, cb) => setImmediate(() => cb(null))),
  };

  const urls = ['url1', 'url2', 'url3'];

  t.throws(getUrlsInfo(fbApp)(urls), 'Unexpected error');
});
