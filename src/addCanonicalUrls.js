import { coalesce } from 'object-path';

export const addCanonicalUrls = links =>
  links.map(link => ({
    ...link,
    url: coalesce(link, ['metadata.ogUrl', 'id']),
  }))
;

export default addCanonicalUrls;
