import { coalesce } from 'object-path';
import { parse } from 'url';
import debug from 'debug';


const d = debug('addImageUrls');

export const addImageUrls = (links) => {
  d('Input', links);

  const result = links.map((link) => {
    const defaultImage = 'https://placeimg.com/500/240/tech';
    let image = coalesce(link.metadata, ['ogImage', 'twitterImageSrc'], defaultImage);
    if (image) {
      // validates the url
      const { host, path, protocol } = parse(image);
      if (!host || !path || !protocol) {
        image = defaultImage;
      }
    }

    return { ...link, image };
  });

  d('Output', result);

  return result;
};

export default addImageUrls;
