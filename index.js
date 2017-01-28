import Twitter from 'twitter';
import { Facebook } from 'fb';
import moment from 'moment';
import { autoRetrieveAccessToken } from './src/fbUtils';
import { pipePromises } from './src/pipePromises';
import { getLastTweets } from './src/getLastTweets';
import { takeOnesFromHootsuite } from './src/takeOnesFromHootsuite';
import { takeOnesAfterReferenceMoment } from './src/takeOnesAfterReferenceMoment';
import { extractLinks } from './src/extractLinks';
import { unshortenLinks } from './src/unshortenLinks';
import { getUrlsInfo } from './src/getUrlsInfo';

const twitterClient = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

const fbApp = autoRetrieveAccessToken(new Facebook({
  version: 'v2.7',
  appId: process.env.FACEBOOK_APP_ID,
  appSecret: process.env.FACEBOOK_APP_SECRET,
}));

const screenName = process.env.TWITTER_SCREEN_NAME;
const maxTweets = 200;
const referenceMoment = moment().subtract('1', 'week').startOf('day');

const print = data => console.log(JSON.stringify(data, null, 2));

pipePromises(
  () => getLastTweets(twitterClient, screenName, maxTweets),
  takeOnesFromHootsuite,
  tweets => takeOnesAfterReferenceMoment(tweets, referenceMoment),
  extractLinks,
  unshortenLinks,
  links => getUrlsInfo(fbApp, links),
  print,
);

// const getTweets = () => {};
// const takeOnlyOnesFromHootsuite = () => {};
// const takeOnlyPreviousWeek = () => {};
// const extractLinks = () => {};
// const unshortenLinks = () => {};
// const getUrlInfos = () => {};
// const calculateUrlScore = () => {};
// const sortLinksByScore = () => {};
// const takeN = () => {};
