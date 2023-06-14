# ⚠️ This library is deprecated

The code in this library has been merged back into [FullStackBulletin/sls-create-newsletter-issue](https://github.com/FullStackBulletin/sls-create-newsletter-issue). For a better description of the reasons, check out [this PR](https://github.com/FullStackBulletin/sls-create-newsletter-issue/pull/55).

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

#### Options

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


#### `.env` tip

You can use the file `.env~sample` available here as a template to store your environment variables. If you copy it into an `.env` file you can then run:

```bash
source .env && best-scheduled-tweets
```


#### Sample output

The command will provide an output similar to the following:

```json
[
  {
    "title": "Google planning AI tools for Pi makers this year",
    "url": "http://social.techcrunch.com/2017/01/25/google-planning-ai-tools-for-pi-makers-this-year/",
    "description": "Google is intending to expand the dev tools available to makers using the Raspberry Pi microprocessor to power their projects this year -- potentially..",
    "image": "https://tctechcrunch2011.files.wordpress.com/2016/02/pi3_angled_web.jpg?w=764&h=400&crop=1",
    "score": 3789
  },
  {
    "title": "RethinkDB: why we failed",
    "url": "http://www.defstartup.org/2017/01/18/why-rethinkdb-failed.html",
    "description": "When we announced that RethinkDB is shutting down, I promised to write a post-mortem. I took some time to process the experience, and I can now write about i...",
    "image": "http://placehold.it/350x150/ffffff/0000000&text=www.defstartup.org",
    "score": 1022
  },
  {
    "title": "Making Responsive HTML Email Coding Easy With MJML – Smashing Magazine",
    "url": "https://www.smashingmagazine.com/2017/01/making-responsive-html-email-coding-easy-with-mjml/",
    "description": "MJML is the only framework making responsive email easy. Learn how to create your own responsive email thanks to MJML in this step-by-step tutorial.",
    "image": "https://www.smashingmagazine.com/wp-content/uploads/2017/01/mjml-vs-html-preview-opt.png",
    "score": 963
  },
  {
    "title": "Shut Up and Take My Money!",
    "url": "/v/33c3-7969-shut_up_and_take_my_money",
    "description": "FinTechs increasingly cut the ground from under long-established banks’ feet. With a \"Mobile First\" strategy, many set their sights on br...",
    "image": "https://static.media.ccc.de/media/congress/2016/7969-hd_preview.jpg",
    "score": 627
  },
  {
    "title": "A Trip Down The LoL Graphics Pipeline",
    "url": "https://engineering.riotgames.com/news/trip-down-lol-graphics-pipeline",
    "description": "http://riot.com/2k1Hx8G #RiotTechBlog",
    "image": "https://engineering.riotgames.com/sites/default/files/articles/55/renderingheadercropped.png",
    "score": 621
  },
  {
    "title": "Gmail will block .js file attachments starting February 13, 2017",
    "url": "https://gsuiteupdates.googleblog.com/2017/01/gmail-will-restrict-js-file-attachments.html",
    "description": "Gmail currently restricts certain file attachments (e.g. .exe, .msc, and .bat) for security reasons, and starting on February 13, 2017 , we...",
    "image": "http://2.bp.blogspot.com/-7bZ5EziliZQ/VynIS9F7OAI/AAAAAAAASQ0/BJFntXCAntstZe6hQuo5KTrhi5Dyz9yHgCK4B/s1600/googlelogo_color_200x200.png",
    "score": 436
  },
  {
    "title": "The Underestimated Power Of Color In Mobile App Design",
    "url": "https://www.smashingmagazine.com/2017/01/underestimated-power-color-mobile-app-design/",
    "description": "This article covers the most important points related to color in apps, and how to choose colors and contrasts for your app that support usability.",
    "image": "https://www.smashingmagazine.com/wp-content/uploads/2017/01/color-wheels-graph-opt.png",
    "score": 420
  }
]
```


## Contributing

Everyone is very welcome to contribute to this project.
You can contribute just by submitting bugs or suggesting improvements by
[opening an issue on GitHub](https://github.com/FullStackBulletin/best-scheduled-tweets/issues).


## License

Licensed under [MIT License](LICENSE). © Luciano Mammino.
