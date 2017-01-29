import Twitter from 'twitter';
import { Facebook } from 'fb';
import cloudinary from 'cloudinary';
import moment from 'moment';
import { autoRetrieveAccessToken } from './src/utils/fb';
import { persistedMemoize } from './src/utils/persistedMemoize';
import { bestScheduledTweets } from './src/bestScheduledTweets';

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

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const screenName = process.env.TWITTER_SCREEN_NAME;
const referenceMoment = moment().subtract('1', 'week').startOf('day');

const print = data => console.log(JSON.stringify(data, null, 2));

const getLinks = persistedMemoize('./.cache', 'bst')(bestScheduledTweets(twitterClient, fbApp, cloudinary));
getLinks(screenName, referenceMoment).then(print);
