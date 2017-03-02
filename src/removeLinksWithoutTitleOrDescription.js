export const removeLinksWithoutTitleOrDescription = links =>
  links.filter(link => link && link.title && link.description);

export default removeLinksWithoutTitleOrDescription;
