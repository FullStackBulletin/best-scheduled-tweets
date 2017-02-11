export const removeBlacklistedUrls = (blacklist) => {
  const b = new Set(blacklist);
  return links => links.filter(link => !b.has(link));
};

export default removeBlacklistedUrls;
