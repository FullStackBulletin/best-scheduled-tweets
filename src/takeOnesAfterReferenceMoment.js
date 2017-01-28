import moment from 'moment';

export const takeOnesAfterReferenceMoment = (tweets, referenceMoment) => tweets.filter((tweet) => {
  const tweetTime = moment(new Date(tweet.created_at));
  return tweetTime.isAfter(referenceMoment);
});

export default takeOnesAfterReferenceMoment;
