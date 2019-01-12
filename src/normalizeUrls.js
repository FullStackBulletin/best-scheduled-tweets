import normalize from 'normalize-url';
import debug from 'debug';

const d = debug('normalizeUrls');

export const normalizeUrls = (urls) => {
  d('Input', urls);

  const result = urls.map(normalize);

  d('Output', result);

  return result;
};

export default normalizeUrls;
