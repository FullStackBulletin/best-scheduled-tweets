import { mapLimit } from 'async';
import { coalesce } from 'object-path';

const retrieveMetadataFromLink = metaExtractor => (link, cb) => {
  metaExtractor({ uri: link.id }, (err, metadata) => {
    if (err) {
      // if it's not possible to retrieve metadata ignore the link
      return cb(null, undefined);
    }

    const image = coalesce(metadata, ['ogImage', 'twitterImageSrc'], null);

    return cb(null, { ...link, image, metadata });
  });
};

export const retrieveMetadata = metaExtractor => links => new Promise((resolve) => {
  const limit = 10;
  mapLimit(
    links,
    limit,
    retrieveMetadataFromLink(metaExtractor),
    (err, linksWithMetadata) => resolve(linksWithMetadata),
  );
});

export default retrieveMetadata;
