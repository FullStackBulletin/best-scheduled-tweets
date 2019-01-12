import { mapLimit } from 'async';
import debug from 'debug';

const d = debug('getUrlsInfo');

const getUrlInfo = fbApp => (url, cb) => {
  // facebook client doesn't follow callback errors
  // conventions
  fbApp.api('', { id: encodeURI(url), fields: ['engagement'] }, (res) => {
    if (!res || res.error) {
      return cb(new Error(res ? JSON.stringify(res.error) : 'Unexpected error'));
    }
    return cb(null, res);
  });
};

export const getUrlsInfo = fbApp => (urls) => {
  d('Input', urls);

  const result = new Promise((resolve, reject) => {
    const getInfo = getUrlInfo(fbApp);
    const limit = 10;
    mapLimit(urls, limit, getInfo, (err, urlsInfo) => {
      if (err) {
        return reject(err);
      }

      return resolve(urlsInfo);
    });
  });

  d('Output', result);

  return result;
};

export default getUrlsInfo;
