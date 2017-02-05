import { coalesce } from 'object-path';

export const keepMinimalData = urlsInfo =>
  urlsInfo.map(record => (
    {
      title: coalesce(record, ['og_object.title', 'metadata.ogTitle', 'metadata.title']),
      url: record.url,
      description: coalesce(record, ['og_object.description', 'metadata.ogDescription', 'metadata.twitterDescription', 'metadata.description']),
      image: record.image,
      score: record.score,
    }
  ),
);

export default keepMinimalData;
