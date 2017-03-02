import normalize from 'normalize-url';
import { coalesce } from 'object-path';

export const addCanonicalUrls = linksData =>
  linksData.map((linkData) => {
    let url = coalesce(linkData, ['metadata.ogUrl', 'id']);
    if (url) {
      url = normalize(url);
    }

    return { ...linkData, url };
  })
;

export default addCanonicalUrls;
