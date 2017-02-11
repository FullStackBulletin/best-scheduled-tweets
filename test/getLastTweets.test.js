import test from 'ava';
import { spy } from 'sinon';
import { getLastTweets } from '../src/getLastTweets';

test('it should use the twitter client to retrieve last tweets for every user', (t) => {
  const twitterClient = {
    get: spy(
      (api, options, cb) => setImmediate(() => cb(null, `Tweets for ${options.screen_name}`)),
    ),
  };

  const screenNames = ['andreaman87', 'loige'];
  const maxTweets = 20;
  const api = 'statuses/user_timeline';

  getLastTweets(twitterClient, screenNames, maxTweets)
  .then((tweets) => {
    t.is(twitterClient.get.callCount, screenNames.length);
    screenNames.forEach((name, i) => {
      const [currentApi, currentOptions] = twitterClient.get.getCall(i).args;
      t.is(currentApi, api);
      t.deepEqual(currentOptions, { screen_name: name, count: maxTweets });
    });
    t.deepEqual(tweets, screenNames.map(name => `Tweets for ${name}`));
  });
});

test('It should reject if one of the api calls to twitter fails', (t) => {
  const twitterClient = {
    get: spy(
      (api, options, cb) => setImmediate(() => cb(new Error(`Error for ${options.screen_name}`))),
    ),
  };

  const screenNames = ['andreaman87', 'loige'];
  const maxTweets = 20;

  t.throws(getLastTweets(twitterClient, screenNames, maxTweets), 'Error for andreaman87');
});
