import values from 'object-values';
import { get } from 'object-path';

export const uniqueBy = keyPath => arr => values(arr.reduce((dict, current) => {
  const key = get(current, keyPath);
  const newDict = dict;
  if (!Object.prototype.hasOwnProperty.call(dict, key)) {
    newDict[key] = current;
  }

  return newDict;
}, {}));

export default uniqueBy;
