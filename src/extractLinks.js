export const extractLinks = tweets => tweets.reduce((links, tweet) =>
  links.concat(tweet.entities.urls.map(link => link.expanded_url))
, []);

export default extractLinks;
