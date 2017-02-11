import { mapLimit } from 'async';
import { coalesce } from 'object-path';

const retrieveMetadataFromLink = metaExtractor => (link, cb) => {
  metaExtractor({ uri: link.id }, (err, metadata) => {
    if (err) {
      return cb(err);
    }

    const image = coalesce(metadata, ['ogImage', 'twitterImageSrc'], null);

    return cb(null, { ...link, image, metadata });
  });
};

export const retrieveMetadata = metaExtractor => links => new Promise((resolve, reject) => {
  const limit = 10;
  mapLimit(links, limit, retrieveMetadataFromLink(metaExtractor), (err, linksWithMetadata) => {
    if (err) {
      return reject(err);
    }

    return resolve(linksWithMetadata);
  });
});

export default retrieveMetadata;
