import { mapLimit } from 'async';
import { get } from 'request';

const unshortenLink = (link, cb) => {
  get({ url: link, followRedirect: false }, (err, response) => {
    if (err) {
      // if cannot ping the link mark it as undefined so that it can be removed later
      return cb(null, undefined);
    }

    return cb(null, response.headers.location ? response.headers.location : link);
  });
};

export const unshortenLinks = links => new Promise((resolve, reject) => {
  const limit = 10;
  mapLimit(links, limit, unshortenLink, (err, unshortenedLinks) => {
    if (err) {
      return reject(err);
    }

    return resolve(unshortenedLinks);
  });
});

export default unshortenLinks;
