import test from 'ava';
import { removeLinksWithoutTitleOrDescription } from '../src/removeLinksWithoutTitleOrDescription';

test('it should remove links without title or description', (t) => {
  const links = [
    { id: 'id1', title: 'title1', description: 'description1' },
    { id: 'id2', description: 'description2' },
    { id: 'id3', title: 'title3' },
    { id: 'id4' },
    undefined,
  ];

  const expectedLinks = [
    { id: 'id1', title: 'title1', description: 'description1' },
  ];

  t.deepEqual(removeLinksWithoutTitleOrDescription(links), expectedLinks);
});
