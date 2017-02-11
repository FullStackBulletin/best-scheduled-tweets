import { coalesce } from 'object-path';

export const addCanonicalUrls = linksData =>
  linksData.map(linkData => ({
    ...linkData,
    url: coalesce(linkData, ['metadata.ogUrl', 'id']),
  }))
;

export default addCanonicalUrls;
