/* eslint no-console: 0 */

import Twitter from 'twitter';
import { Facebook } from 'fb';
import moment from 'moment';
import pkg from '../package.json';
import { autoRetrieveAccessToken } from './utils/fb';
import { bestScheduledTweets } from './bestScheduledTweets';

if (['-h', '--help', 'help', '-v', '--version', 'version'].indexOf(process.argv[2]) !== -1) {
  console.log(
    `Best scheduled tweets - version: ${pkg.version}

This program needs to have the following environment variables set:

  - TWITTER_CONSUMER_KEY: a valid Twitter consumer key
  - TWITTER_CONSUMER_SECRET: a valid Twitter consumer secret
  - TWITTER_ACCESS_TOKEN_KEY: a valid Twitter access token key
  - TWITTER_ACCESS_TOKEN_SECRET: a valid Twitter access token secret
  - FACEBOOK_APP_ID: a valid Facebook application id
  - FACEBOOK_APP_SECRET: a valid Facebook application secret
  - TWITTER_SCREEN_NAMES: a list of comma separated Twitter usernames
  - REFERENCE_MOMENT (optional): a date time string representing the starting point for tweets.
      it will default to one week ago.
`,
  );
  process.exit(0);
}

const twitterClient = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

const fbApp = autoRetrieveAccessToken(
  new Facebook({
    version: 'v3.2',
    appId: process.env.FACEBOOK_APP_ID,
    appSecret: process.env.FACEBOOK_APP_SECRET,
  }),
);

const screenNames = process.env.TWITTER_SCREEN_NAMES.split(',');
const referenceMoment = process.env.REFERENCE_MOMENT
  ? moment(process.env.REFERENCE_MOMENT)
  : moment()
    .subtract('1', 'week')
    .startOf('day');

const print = data => console.log(JSON.stringify(data, null, 2));

const options = {
  twitterClient,
  fbApp,
  referenceMoment,
  screenNames,
};

bestScheduledTweets(options).then(print);
