import { mapLimit } from 'async';

const getUrlInfo = fbApp => (url, cb) => {
  // facebook client doesn't follow callback errors
  // conventions
  fbApp.api(encodeURIComponent(url), (res) => {
    if (!res || res.error) {
      return cb(new Error(res ? res.error : 'Unexpected error'));
    }
    return cb(null, res);
  });
};

export const getUrlsInfo = fbApp => urls => new Promise((resolve, reject) => {
  const getInfo = getUrlInfo(fbApp);
  const limit = 10;
  mapLimit(urls, limit, getInfo, (err, urlsInfo) => {
    if (err) {
      return reject(err);
    }

    return resolve(urlsInfo);
  });
});

export default getUrlsInfo;
