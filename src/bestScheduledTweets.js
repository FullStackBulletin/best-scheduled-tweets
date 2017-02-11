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
import { uploadImagesToCloudinary } from './uploadImagesToCloudinary';
import { keepMinimalData } from './keepMinimalData';

export const bestScheduledTweets = (twitterClient, fbApp, cloudinary) =>
  (screenNames, referenceMoment, options = { maxTweets: 200, limit: 7 }) =>
    pipePromises(
      () => getLastTweets(twitterClient, screenNames, options.maxTweets),
      takeOnesFromHootsuite,
      takeOnesAfterReferenceMoment(referenceMoment),
      extractLinks,
      unique,
      unshortenLinks(request),
      removeUndefined,
      unique,
      removeBlacklistedUrls([]),
      getUrlsInfo(fbApp),
      retrieveMetadata(metaExtractor),
      addCanonicalUrls,
      uniqueBy('url'),
      calculateUrlsScore,
      sortByScore,
      takeN(options.limit),
      addImageUrls,
      uploadImagesToCloudinary(cloudinary),
      keepMinimalData,
    )
;

export default bestScheduledTweets;
