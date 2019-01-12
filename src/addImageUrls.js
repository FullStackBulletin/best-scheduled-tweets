import { coalesce } from 'object-path';
import debug from 'debug';

const d = debug('addImageUrls');

export const addImageUrls = (links) => {
  d('Input', links);

  const result = links.map((link) => {
    const defaultImage = `https://placeholdit.imgix.net/~text?txtsize=60&bg=ffd300&txtclr=0000000%26text%3Dblog&txt=${encodeURIComponent(
      link.metadata.host,
    )}&w=500&h=240`;
    const image = coalesce(link.metadata, ['ogImage', 'twitterImageSrc'], defaultImage);

    return { ...link, image };
  });

  d('Output', result);

  return result;
};

export default addImageUrls;
