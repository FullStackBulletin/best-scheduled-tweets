import test from 'ava';
import { calculateUrlsScore } from '../src/calculateUrlsScore';

test('It should calculate and add the score to a set of links', (t) => {
  const urls = [
    { share: { comment_count: 10, share_count: 17 } },
    { share: { comment_count: 10 } },
    { share: { share_count: 17 } },
    {},
  ];

  const urlsWithScore = calculateUrlsScore(urls);
  t.is(urlsWithScore[0].score, 27);
  t.is(urlsWithScore[1].score, 0);
  t.is(urlsWithScore[2].score, 0);
  t.is(urlsWithScore[3].score, 0);
});
