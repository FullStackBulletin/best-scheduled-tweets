export const calculateUrlScore = (urlInfo) => {
  if (
    typeof (urlInfo.share) !== 'undefined' &&
    typeof (urlInfo.share.comment_count) !== 'undefined' &&
    typeof (urlInfo.share.share_count) !== 'undefined'
  ) {
    return urlInfo.share.comment_count + urlInfo.share.share_count;
  }

  return 0;
};

export const addUrlsScore = urlsInfo => urlsInfo.map(
  urlInfo => Object.assign(urlInfo, { score: calculateUrlScore(urlInfo) }),
);

export default addUrlsScore;
