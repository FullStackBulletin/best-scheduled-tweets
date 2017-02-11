export const extractLinks = tweets => tweets.reduce((links, tweet) =>
  tweet.entities.urls ?
    links.concat(tweet.entities.urls.map(link => link.expanded_url)) :
    links
, []);

export default extractLinks;
