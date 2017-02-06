const getLastTweetsPerUser = (client, screenName, maxTweets) => (cb) => {
  const options = {
    screen_name: screenName,
    count: maxTweets,
  };

  return client.get('statuses/user_timeline', options, cb);
};

export const getLastTweets = (client, screenName, maxTweets) => new Promise((resolve, reject) => {
  // TODO use maplimit to get all the tweets per all the users
});

export default getLastTweets;
