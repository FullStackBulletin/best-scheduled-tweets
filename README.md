# Best scheduled tweets

[![npm version](https://badge.fury.io/js/best-scheduled-tweets.svg)](http://badge.fury.io/js/best-scheduled-tweets) [![CircleCI](https://circleci.com/gh/FullStackBulletin/best-scheduled-tweets.svg?style=shield)](https://circleci.com/gh/FullStackBulletin/best-scheduled-tweets) [![codecov](https://codecov.io/gh/FullStackBulletin/best-scheduled-tweets/branch/master/graph/badge.svg)](https://codecov.io/gh/FullStackBulletin/best-scheduled-tweets)

An opinionated library to extract the best links from scheduled tweets from a
given Twitter account using Hootsuite (as scheduler source) and Facebook (as ranking mechanism).

It can be useful to build bots or automated newsletters.


## Install

With NPM:

```bash
npm install best-scheduled-tweets
```

with Yarn:

```bash
yarn add best-scheduled-tweets
```


## Requirements

This library requires **Node.js >= 4.3.2**. Therefore it can be used safely within AWS Lambda using the Node.js setup.


## Usage

The library is composed by a programmatic interface that can be used within Node.js applications and an indipendent command line application that runs on Mac and most linux distributions (with Node.js >= 4.3.2 installed).


### Library

To import the library in your project you need to do the following:

With ES2015+:

```javascript
import { bestScheduledTweets } from 'best-scheduled-tweets';
```

With ES5:

```javascript
const bestScheduledTweets = require('best-scheduled-tweets').default;
```

`bestScheduledTweets` is now a function that can be invoked with an `options` object as argument to retrieve the best links from scheduled tweets:

```javascript
const options = {/* ... */};
const bestLinks = bestScheduledTweets(options);
```

Internally the library will perform several http requests (Twitter API, Facebook API, URL unshortening, metadata retrieval, ...) so the processing might take a while. Be sure your environment can run for more than 10 seconds and be prepared to use caching mechanisms if needed.

### Options

The options available are the following:

 - `twitterClient` (mandatory): a twitter client instance created with the [twitter](https://www.npmjs.com/package/twitter) library
 - `fbApp` (mandatory): a facebook app instance created with the [fb](https://www.npmjs.com/package/fb) library
 - `referenceMoment` (mandatory): A [moment](https://www.npmjs.com/package/moment) instance representing a start time from which to consider the tweets
 - `screenNames` (mandatory): An array of twitter usernames
 - `maxTweetsPerUser` (optional, default `200`): The number of maximum tweets to fetch per user (max `200`)
 - `numResults` (optional, default `7`): The number of links to keep at the end
 - `blacklistedUrls` (optional, default `[]`): A set of blacklisted url that will be ignored in case they are fetched by the main process


### Command line app

The command line app can be invoked by simply running in your shell:

```bash
best-scheduled-tweets
```

This program needs to have the following environment variables set:

 - `TWITTER_CONSUMER_KEY`: a valid Twitter consumer key
 - `TWITTER_CONSUMER_SECRET`: a valid Twitter consumer secret
 - `TWITTER_ACCESS_TOKEN_KEY`: a valid Twitter access token key
 - `TWITTER_ACCESS_TOKEN_SECRET`: a valid Twitter access token secret
 - `FACEBOOK_APP_ID`: a valid Facebook application id
 - `FACEBOOK_APP_SECRET`: a valid Facebook application secret
 - `TWITTER_SCREEN_NAMES`: a list of comma separated Twitter usernames
 - `REFERENCE_MOMENT` (optional): a date time string representing the starting point for tweets (it will default to one week ago).

In case of success, the command will output the result in JSON format in the console.


## Contributing

Everyone is very welcome to contribute to this project.
You can contribute just by submitting bugs or suggesting improvements by
[opening an issue on GitHub](https://github.com/FullStackBulletin/best-scheduled-tweets/issues).


## License

Licensed under [MIT License](LICENSE). © Luciano Mammino.
