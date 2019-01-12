import { parse, resolve } from 'url';
import normalize from 'normalize-url';
import { coalesce } from 'object-path';
import debug from 'debug';

const d = debug('addCanonicalUrls');

export const addCanonicalUrls = (linksData) => {
  d('Input', linksData);

  const result = linksData.map((linkData) => {
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
  });

  d('Output', result);

  return result;
};

export default addCanonicalUrls;
