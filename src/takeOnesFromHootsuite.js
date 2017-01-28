export const takeOnesFromHootsuite = tweets =>
  tweets.filter(tweet => tweet.source.match(/Hootsuite/));

export default takeOnesFromHootsuite;
