import { mapLimit } from 'async';
import extract from 'meta-extractor';
import { coalesce } from 'object-path';

const retrieveLinkImage = (linkInfo, cb) => {
  extract({ uri: linkInfo.id }, (err, metadata) => {
    if (err) {
      return cb(err);
    }

    const defaultImage =
      (metadata.images && metadata.images.size) ?
        (Array.from(metadata.images))[0] :
        `http://placehold.it/350x150/ffffff/0000000&text=${encodeURIComponent(metadata.host)}`;
    const image = coalesce(metadata, ['ogImage', 'twitterImageSrc'], defaultImage);

    return cb(null, Object.assign(linkInfo, { image, metadata }));
  });
};

export const retrieveLinksImage = links => new Promise((resolve, reject) => {
  const limit = 10;
  mapLimit(links, limit, retrieveLinkImage, (err, linksWithMetadata) => {
    if (err) {
      return reject(err);
    }

    return resolve(linksWithMetadata);
  });
});

export default retrieveLinksImage;
