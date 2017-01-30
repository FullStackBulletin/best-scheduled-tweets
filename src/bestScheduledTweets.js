import { pipePromises } from './utils/pipePromises';
import { getLastTweets } from './getLastTweets';
import { takeOnesFromHootsuite } from './takeOnesFromHootsuite';
import { takeOnesAfterReferenceMoment } from './takeOnesAfterReferenceMoment';
import { extractLinks } from './extractLinks';
import { unique } from './unique';
import { unshortenLinks } from './unshortenLinks';
import { getUrlsInfo } from './getUrlsInfo';
import { addUrlsScore } from './addUrlsScore';
import { sortByScore } from './sortByScore';
import { takeN } from './takeN';
import { retrieveLinksImage } from './retrieveLinksImage';
import { uploadImagesToCloudinary } from './uploadImagesToCloudinary';
import { keepMinimalData } from './keepMinimalData';

export const bestScheduledTweets = (twitterClient, fbApp, cloudinary) =>
  (screenName, referenceMoment, options = { maxTweets: 200, limit: 7 }) =>
    pipePromises(
      () => getLastTweets(twitterClient, screenName, options.maxTweets),
      takeOnesFromHootsuite,
      takeOnesAfterReferenceMoment(referenceMoment),
      extractLinks,
      unique,
      unshortenLinks,
      getUrlsInfo(fbApp),
      addUrlsScore,
      sortByScore,
      takeN(options.limit),
      retrieveLinksImage,
      uploadImagesToCloudinary(cloudinary),
      keepMinimalData,
    )
;

export default bestScheduledTweets;
