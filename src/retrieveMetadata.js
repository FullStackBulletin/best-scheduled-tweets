import { mapLimit } from 'async';
import { coalesce, get } from 'object-path';

const retrieveMetadataFromLink = metaExtractor => (link, cb) => {
  metaExtractor({ uri: link.id }, (err, metadata) => {
    if (err) {
      // if it's not possible to retrieve metadata ignore the link
      return cb(null, undefined);
    }

    const image = coalesce(metadata, ['ogImage', 'twitterImageSrc'], null);
    const title = get(link, 'og_object.title') || coalesce(metadata, ['ogTitle', 'title']);
    const description = get(link, 'og_object.description') || coalesce(metadata, ['ogDescription',
      'twitterDescription', 'description']);

    return cb(null, { ...link, image, title, description, metadata });
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
