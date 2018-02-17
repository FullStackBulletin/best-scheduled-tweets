import { mapLimit } from 'async';

const unshortenLink = request => (link, cb) => {
  request.get({ url: encodeURI(link), followRedirect: false }, (err, response) => {
    if (err) {
      // if cannot ping the link mark it as undefined so that it can be removed later
      return cb(null, undefined);
    }

    return cb(null, response.headers.location ? encodeURI(response.headers.location) : link);
  });
};

export const unshortenLinks = request => links => new Promise((resolve) => {
  const limit = 10;
  mapLimit(
    links,
    limit,
    unshortenLink(request),
    (err, unshortenedLinks) => resolve(unshortenedLinks),
  );
});

export default unshortenLinks;
