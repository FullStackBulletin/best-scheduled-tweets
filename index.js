import Twitter from 'twitter';
import { Facebook } from 'fb';
import moment from 'moment';
import { autoRetrieveAccessToken } from './src/fbUtils';
import { pipePromises } from './src/pipePromises';
import { getLastTweets } from './src/getLastTweets';
import { takeOnesFromHootsuite } from './src/takeOnesFromHootsuite';
import { takeOnesAfterReferenceMoment } from './src/takeOnesAfterReferenceMoment';
import { extractLinks } from './src/extractLinks';
import { unique } from './src/unique';
import { unshortenLinks } from './src/unshortenLinks';
import { getUrlsInfo } from './src/getUrlsInfo';
import { addUrlsScore } from './src/addUrlsScore';
import { sortByScore } from './src/sortByScore';
import { takeN } from './src/takeN';

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
const prettyPrint = (data) => {
  data.forEach((record, i) => {
    console.log(`---- ${i} ----`);
    print(record);
  });
};

pipePromises(
  () => getLastTweets(twitterClient, screenName, maxTweets),
  takeOnesFromHootsuite,
  takeOnesAfterReferenceMoment(referenceMoment),
  extractLinks,
  unique,
  unshortenLinks,
  getUrlsInfo(fbApp),
  addUrlsScore,
  sortByScore,
  takeN(7),
  prettyPrint,
);
