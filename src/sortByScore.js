/* eslint no-confusing-arrow: 0 */
export const sortByScore = urlsInfo => urlsInfo.sort(
  (url1, url2) => (url1.score - url2.score) < 0 ? 1 : -1,
);

export default sortByScore;
