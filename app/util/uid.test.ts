import { getUid } from './uid';

it('should generate no conflict id', () => {
  const arr = Array(1000).fill(0).map(() => getUid()).sort();
  console.log(arr);
  arr.reduce((i, j) => {
    expect(i).not.toEqual(j);
    return j;
  });
});
