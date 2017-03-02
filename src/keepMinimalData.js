export const keepMinimalData = urlsInfo =>
  urlsInfo.map(({ title, url, description, image, score }) => (
    {
      title,
      url,
      description,
      image,
      score,
    }
  ),
);

export default keepMinimalData;
