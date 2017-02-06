import { mapLimit } from 'async';
import { flatten } from './utils/flatten';

const getLastTweetsPerUser = (client, maxTweets) => (screenName, cb) => {
  const options = {
    screen_name: screenName,
    count: maxTweets,
  };

  return client.get('statuses/user_timeline', options, cb);
};

export const getLastTweets = (client, screenNames, maxTweets) => new Promise((resolve, reject) => {
  const limit = 10;
  const lastTweetsPerUser = getLastTweetsPerUser(client, maxTweets);
  mapLimit(screenNames, limit, lastTweetsPerUser, (err, tweets) => {
    if (err) {
      return reject(err);
    }

    const flattenedTweets = flatten(tweets);

    return resolve(flattenedTweets);
  });
});

export default getLastTweets;
