import { getUid } from './uid';

it('should generate no conflict id at the same time', () => {
  Array(1000).fill(0).map(() => getUid()).sort().reduce((i, j) => {
    expect(i).not.toEqual(j);
    return j;
  });
});

it('should generate no conflict in high frequent requests', () =>
  Promise.all(
    Array(1000).fill(0).map(
      () => new Promise((res) => setTimeout(() => res(getUid()), Math.floor(Math.random() * 200))),
    ),
  ).then((arr) => arr.reduce((i, j) => {
    expect(i).not.toEqual(j);
    return j;
  })),
);
