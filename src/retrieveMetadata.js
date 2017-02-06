import { mapLimit } from 'async';
import extract from 'meta-extractor';
import { coalesce } from 'object-path';

const retrieveMetadataFromLink = (link, cb) => {
  extract({ uri: link.id }, (err, metadata) => {
    if (err) {
      return cb(err);
    }

    const image = coalesce(metadata, ['ogImage', 'twitterImageSrc'], null);

    return cb(null, { ...link, image, metadata });
  });
};

export const retrieveMetadata = links => new Promise((resolve, reject) => {
  const limit = 10;
  mapLimit(links, limit, retrieveMetadataFromLink, (err, linksWithMetadata) => {
    if (err) {
      return reject(err);
    }

    return resolve(linksWithMetadata);
  });
});

export default retrieveMetadata;
