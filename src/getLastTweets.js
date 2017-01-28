export const getLastTweets = (client, screenName, maxTweets) => new Promise((resolve, reject) => {
  const options = {
    screen_name: screenName,
    count: maxTweets,
  };

  client.get('statuses/user_timeline', options, (err, tweets) => {
    if (err) {
      return reject(err);
    }

    return resolve(tweets);
  });
});

export default getLastTweets;
