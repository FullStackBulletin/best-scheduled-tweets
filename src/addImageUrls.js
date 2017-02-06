import { coalesce } from 'object-path';

export const addImageUrls = links => links.map((link) => {
  const defaultImage =
    (link.metadata.images && link.metadata.images.size) ?
      (Array.from(link.metadata.images))[0] :
      `http://placehold.it/350x150/ffffff/0000000&text=${encodeURIComponent(link.metadata.host)}`;
  const image = coalesce(link.metadata, ['ogImage', 'twitterImageSrc'], defaultImage);

  return { ...link, image };
});

export default addImageUrls;
