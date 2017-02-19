import request from 'request';
import metaExtractor from 'meta-extractor';
import { pipePromises } from './utils/pipePromises';
import { getLastTweets } from './getLastTweets';
import { takeOnesFromHootsuite } from './takeOnesFromHootsuite';
import { takeOnesAfterReferenceMoment } from './takeOnesAfterReferenceMoment';
import { extractLinks } from './extractLinks';
import { unique } from './unique';
import { removeBlacklistedUrls } from './removeBlacklistedUrls';
import { removeUndefined } from './removeUndefined';
import { unshortenLinks } from './unshortenLinks';
import { getUrlsInfo } from './getUrlsInfo';
import { retrieveMetadata } from './retrieveMetadata';
import { addCanonicalUrls } from './addCanonicalUrls';
import { uniqueBy } from './uniqueBy';
import { calculateUrlsScore } from './calculateUrlsScore';
import { sortByScore } from './sortByScore';
import { takeN } from './takeN';
import { addImageUrls } from './addImageUrls';
import { keepMinimalData } from './keepMinimalData';

export const defaultOptions = {
  twitterClient: undefined,
  fbApp: undefined,
  referenceMoment: undefined,
  screenNames: [],
  maxTweetsPerUser: 200,
  numResults: 7,
  blacklistedUrls: [],
};

export const bestScheduledTweets = (options) => {
  const opt = { ...defaultOptions, ...options };
  return pipePromises(
    () => getLastTweets(opt.twitterClient, opt.screenNames, opt.maxTweetsPerUser),
    takeOnesFromHootsuite,
    takeOnesAfterReferenceMoment(opt.referenceMoment),
    extractLinks,
    unique,
    unshortenLinks(request),
    removeUndefined,
    unique,
    removeBlacklistedUrls([]),
    getUrlsInfo(opt.fbApp),
    retrieveMetadata(metaExtractor),
    removeUndefined,
    addCanonicalUrls,
    uniqueBy('url'),
    calculateUrlsScore,
    sortByScore,
    takeN(opt.numResults),
    addImageUrls,
    keepMinimalData,
  );
};

export default bestScheduledTweets;
