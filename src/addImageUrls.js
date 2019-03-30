import { coalesce } from 'object-path';
import debug from 'debug';

const d = debug('addImageUrls');

export const addImageUrls = (links) => {
  d('Input', links);

  const result = links.map((link) => {
    const defaultImage = 'https://placeimg.com/500/240/tech';
    const image = coalesce(link.metadata, ['ogImage', 'twitterImageSrc'], defaultImage);

    return { ...link, image };
  });

  d('Output', result);

  return result;
};

export default addImageUrls;
