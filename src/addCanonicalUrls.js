import { parse, resolve } from 'url';
import normalize from 'normalize-url';
import { coalesce } from 'object-path';

export const addCanonicalUrls = linksData =>
  linksData.map((linkData) => {
    let url = coalesce(linkData, ['metadata.ogUrl', 'id']);
    if (url) {
      const parts = parse(url);
      if (!parts.hostname) {
        // the canonical url is relative, we need the absolute one
        url = resolve(linkData.id, url);
      }
      url = normalize(url);
    }

    return { ...linkData, url };
  })
;

export default addCanonicalUrls;
