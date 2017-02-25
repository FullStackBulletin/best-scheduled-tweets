import { coalesce } from 'object-path';

export const addImageUrls = links => links.map((link) => {
  const defaultImage = `https://placeholdit.imgix.net/~text?txtsize=60&bg=ffd300&txtclr=0000000%26text%3Dblog&txt=${encodeURIComponent(link.metadata.host)}&w=500&h=240`;
  const image = coalesce(link.metadata, ['ogImage', 'twitterImageSrc'], defaultImage);

  return { ...link, image };
});

export default addImageUrls;
