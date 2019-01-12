export const removeInvalid = arr =>
  arr.filter(elem => typeof elem !== 'undefined' && /^https?:\/\//i.test(elem));

export default removeInvalid;
