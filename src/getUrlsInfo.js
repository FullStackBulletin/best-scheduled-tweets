import { mapLimit } from 'async';

const getUrlInfo = app => (url, cb) => {
  app.api(encodeURIComponent(url), (res) => {
    if (!res || res.error) {
      return cb(res.error);
    }
    return cb(null, res);
  });
};

export const getUrlsInfo = (app, urls) => new Promise((resolve, reject) => {
  const getInfo = getUrlInfo(app);
  const limit = 10;
  mapLimit(urls, limit, getInfo, (err, urlsInfo) => {
    if (err) {
      return reject(err);
    }

    return resolve(urlsInfo);
  });
});

export default getUrlsInfo;
